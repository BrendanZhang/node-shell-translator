import { ServerResponse } from "http";

const https = require("https");
const querystring = require("querystring");
const crypto = require("crypto");
const chalk = require("chalk");
const errorColor = chalk.bold.red;
import { appKey, appSecret } from "./private/private";
import { errorCodeMessage } from "./errorCode";
import { youdaoResult } from "./common";
import { display } from "./colorLog";
import { langType } from "./availableLang";

export const translate = (type: string, word: string) => {
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

  let typeResult = langType(type);
  if (!typeResult) {
    console.error(errorColor("😢Unexpected type(-t --type <type>), Temporarily using default type."));
    console.error(errorColor("😢无法识别的查询类型(-t --type <type>)，临时使用默认类型(auto)。"));
    typeResult = { from: "auto", to: "auto" };
  }

  const query: string = querystring.stringify({
    q: word,
    appKey: appKey,
    salt: salt,
    from: typeResult.from,
    to: typeResult.to,
    sign: sign,
    signType: "v3",
    strict: true,
    curtime: currentTime,
  });

  const options = {
    hostname: "openapi.youdao.com",
    path: "/api",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(query),
    },
  };

  const req = https.request(options, (res: ServerResponse) => {
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
        console.error(errorColor(errorCodeMessage[obj.errorCode]));
        process.exit(2);
      } else {
        console.error(errorColor("未知错误"));
        process.exit(1);
      }
    });
  });

  req.on("error", (e: Error) => {
    console.error(e);
  });
  req.write(query);
  req.end();
};
