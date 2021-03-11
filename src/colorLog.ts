import {
  blue,
  blueBright,
  cyanBright,
  greenBright,
  green,
  grey,
  yellow,
  yellowBright,
  cyan,
} from "chalk";
import { ILangList, youdaoResult } from "./common";
import { formattedLink } from "./link";
const chalk = require("chalk");
const orange = chalk.keyword("orange");
const errorColor = chalk.bold.red;

const webExplain = (obj: youdaoResult) => {
  // 网络释义
  obj.web &&
    (console.log(cyanBright("网络释义")),
    console.log(blue(obj.web[0].key) + " " + blueBright(obj.web[0].value.join(" ; "))),
    console.log(""),
    console.log(cyanBright("短语")),
    obj.web.map((explain, index) => {
      index !== 0 && console.log(blue(explain.key) + " " + blueBright(explain.value.join(" ; ")));
    }));
};

const translateDirectly = (obj: youdaoResult) => {
  // 直译
  (!obj.basic || !obj.basic.explains) &&
    obj.translation.map((transItem) => console.log(blueBright(transItem)));
};

const enWfs = (obj: youdaoResult) => {
  // 复数 过去分词 过去式 现在分词
  obj.basic.wfs &&
    console.log(
      greenBright(
        `[ ${obj.basic.wfs
          .map((wf) => {
            return `${wf.wf.name} ${wf.wf.value}`;
          })
          .join(" ")} ]`
      )
    );
};

const enBasicDict = (obj: youdaoResult) => {
  // 英文基本词典
  obj.basic &&
    obj.basic.explains.map((explain) => {
      const formattedExplain = explain.split(". ");
      formattedExplain.length > 1
        ? console.log(`${cyan(formattedExplain[0] + ".")} ${blue(formattedExplain[1])}`)
        : console.log(cyan(formattedExplain[0]));
    }),
    enWfs(obj);
};

const en2cn = (obj: youdaoResult) => {
  console.log("");
  console.log(orange(obj.returnPhrase));
  obj.basic.phonetic &&
    console.log(
      yellowBright(`英 [${obj.basic.phonetic}]`),
      yellowBright(`美 [${obj.basic["us-phonetic"]}]`)
    );
  translateDirectly(obj);
  console.log("");
  enBasicDict(obj);
  console.log("");
  webExplain(obj);
  console.log("");
  formattedLink(obj);
  obj.basic.exam_type && console.log(grey(obj.basic.exam_type.join(" ")));
};

const cn2en = (obj: youdaoResult) => {
  console.log("");
  console.log(`${orange(obj.returnPhrase)} `);
  obj.basic.phonetic && console.log(yellow(`[${obj.basic.phonetic}]`));
  translateDirectly(obj);
  console.log("");
  obj.basic &&
    obj.basic.explains.map((explain) => {
      console.log(blue(explain));
    });
  console.log("");
  webExplain(obj);
  console.log("");
  formattedLink(obj);
  console.log("");
};

const notWord = (obj: youdaoResult) => {
  console.log(yellow("除中英外对其他语种及句子的查询能力较弱"));
  console.log("");
  console.log(orange(obj.query));
  translateDirectly(obj);
  console.log("");
  webExplain(obj);
  formattedLink(obj);
  console.log("");
  console.error(errorColor("😢这也许不是你想要的结果"));
  console.error(errorColor("😱This might not be the correct answer."));
  console.log("");
};

const langList: ILangList = {
  ["en2zh-CHS"]: en2cn,
  ["zh-CHS2en"]: cn2en,
  notWord: notWord,
};

export const display = (obj: youdaoResult) => {
  obj.isWord ? (langList[obj.l] ? langList[obj.l](obj) : en2cn(obj)) : langList.notWord(obj);
};
