const https = require("https");
const querystring = require("querystring");
const crypto = require("crypto");
const { appKey, appSecret } = require("../secret/secret.json");

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
    appKey: appKey,
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
      console.log(string);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
};
