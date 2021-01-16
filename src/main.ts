const https = require("https");
const querystring = require("querystring");
const crypto = require("crypto");
const { appKey, appSecret } = require("../secret/secret.json");
const errorCodeMessage = require("./errorCode.json");

export const translate = (word) => {
  // crypto 无所不能
  const salt = crypto.randomBytes(3).toString("base64");
  const currentTime = Math.round(new Date().getTime() / 1000);

  const sign = crypto
    .createHash("sha256")
    .update(
      appKey +
        (word.length <= 20 ? word : `${word.slice(0, 9)}${word.length}${word.slice(-10)}`) +
        salt +
        currentTime.toString() +
        appSecret,
    )
    .digest("hex");

  const query: string = querystring.stringify({
    q: word,
    appKey: appKey + 1,
    salt: salt,
    from: "en",
    to: "zh-CNS",
    sign: sign,
    signType: "v3",
    curtime: currentTime,
  });

  const options = {
    hostname: "openapi.youdao.com",
    path: "/api?" + query,
    method: "GET",
  };

  const req = https.request(options, (res) => {
    let chunks = [];
    res.on("data", (chunk) => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const string = Buffer.concat(chunks).toString();

      type youdaoResult = {
        returnPhrase: string[]; // 需要
        errorCode: string;
        query: string;
        translation: string[]; // 需要
        basic: {
          // 需要
          exam_type: string[];
          phonetic?: string;
          "uk-phonetic"?: string;
          "uk-speech"?: string;
          "us-speech"?: string;
          wfs: { wf: { name: string; value: string[] } }[];
          explains: string[];
        };
        web?: { key: string; value: string[] }[];
        l: string; // 需要
        dict: {
          url: string;
        };
        webdict: {
          url: string;
        };
        tSpeakUrl: string;
        speakUrl: string;
      };
      const obj: youdaoResult = JSON.parse(string);
      if (parseInt(obj.errorCode) === 0) {
        console.dir(obj);
      } else {
        console.log(errorCodeMessage[obj.errorCode]);
      }
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
};
