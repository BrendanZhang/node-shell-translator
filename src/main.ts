import { IncomingMessage } from "http";

const https = require("https");
const querystring = require("querystring");
const crypto = require("crypto");
const chalk = require("chalk");
const error = chalk.bold.red;
import { appKey, appSecret } from "./private/private";
import { errorCodeMessage } from "./errorCode";
import { youdaoResult } from "./common";
import { display } from "./colorLog";

export const translate = (word: string) => {
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

  const target = /[a-zA-Z]/.test(word[0]) ? { from: "en", to: "zh-CNS" } : { from: "zh-CNS", to: "en" };

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
    path: "/api?" + query,
    method: "GET",
  };

  const req = https.request(options, (res: IncomingMessage) => {
    let chunks: Buffer[] = [];
    res.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const string = Buffer.concat(chunks).toString();

      const obj: youdaoResult = JSON.parse(string);
      if (parseInt(obj.errorCode) === 0) {
        display(obj);
        process.exit(0);
      } else if (obj.errorCode in errorCodeMessage) {
        console.error(error(errorCodeMessage[obj.errorCode]));
        process.exit(2);
      } else {
        console.error(error("未知错误"));
        process.exit(1);
      }
    });
  });

  req.on("error", (e: Error) => {
    console.error(e);
  });
  req.end();
};
