const https = require("https");
const querystring = require("querystring");
const crypto = require("crypto");

import { appKey, appSecret } from "../secret/secret.json";

export const translate = (word) => {
  const salt = crypto.randomBytes(3).toString("base64");

  const currentTime = new Date().getTime();

  // 需要 sha256 加密
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
    from: "auto",
    to: "auto",
    sign: sign,
    signType: "v3",
    curtime: currentTime,
  });

  const options = {
    hostname: "openapi.youdao.com",
    port: 443,
    path: "/api",
    method: "GET",
  };

  const req = https.request(options, (res) => {
    console.log("statusCode:", res.statusCode);
    console.log("headers:", res.headers);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (e) => {
    console.error(e);
  });
  req.end();
};
