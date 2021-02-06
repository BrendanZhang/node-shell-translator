import { green } from "chalk";
import { youdaoResult } from "./common";

const terminalLink = require("terminal-link");

const availableLinkLang = ["en", "ja", "ko", "fr"];

export const formattedLink = (obj: youdaoResult) => {
  const translateType = obj.l.replace("zh-CHS", "").replace("2", "");
  const ifCNQuery = /.*[\u4e00-\u9fa5]+.*/.test(obj.query);
  const linkQuery =
    obj.l === "zh-CHS2en" ? obj.query : ifCNQuery ? obj.translation : obj.query;
  const link = terminalLink(
    `web dict`,
    `https://www.youdao.com/w/${translateType}/${linkQuery}`
  );
  availableLinkLang.indexOf(translateType) !== -1 && console.log(green(link));
};
