import { blue, blueBright, cyanBright, greenBright, grey, whiteBright, yellow, yellowBright, cyan } from "chalk";
import { ILangList, youdaoResult } from "./common";
const chalk = require("chalk");
const orange = chalk.keyword("orange");
const errorColor = chalk.bold.red;

const en2cn = (obj: youdaoResult) => {
  console.log(obj);
  console.log("");
  console.log(orange(obj.returnPhrase));
  console.log(yellowBright(`英 [${obj.basic["uk-phonetic"]}]`), yellowBright(`美 [${obj.basic.phonetic}]`));
  !obj.basic && obj.translation.map((transItem) => console.log(blueBright(transItem)));
  console.log("");
  obj.basic &&
    obj.basic.explains.map((explain) => {
      const formattedExplain = explain.split(". ");
      console.log(`${chalk.cyan(formattedExplain[0] + ".")} ${chalk.blue(formattedExplain[1])}`);
    }),
    obj.basic.wfs &&
      console.log(
        greenBright(
          `[ ${obj.basic.wfs
            .map((wf) => {
              return `${wf.wf.name} ${wf.wf.value}`;
            })
            .join(" ")} ]`,
        ),
      );
  console.log("");
  obj.web &&
    (console.log(cyanBright("网络释义")),
    console.log(blue(obj.web[0].key) + " " + blueBright(obj.web[0].value.join(" ; "))),
    console.log(""),
    console.log(cyanBright("短语")),
    obj.web.map((webExplain, index) => {
      index !== 0 && console.log(blue(webExplain.key) + " " + blueBright(webExplain.value.join(" ; ")));
    }));
  console.log("");
  obj.basic.exam_type && console.log(grey(obj.basic.exam_type.join(" ")));
};

const cn2en = (obj: youdaoResult) => {
  console.log("");
  console.log(`${orange(obj.returnPhrase)} `);
  obj.basic.phonetic && console.log(yellow(`[${obj.basic.phonetic}]`));
  !obj.basic && console.log(blueBright(obj.translation));
  console.log("");
  obj.basic &&
    obj.basic.explains.map((explain) => {
      console.log(blue(explain));
    });
  console.log("");
  obj.web &&
    (console.log(cyanBright("网络释义")),
    console.log(blue(obj.web[0].key) + " " + blueBright(obj.web[0].value.join(" ; "))),
    console.log(""),
    console.log(cyanBright("短语")),
    obj.web.map((webExplain, index) => {
      index !== 0 && console.log(blue(webExplain.key) + " " + blueBright(webExplain.value.join(" ; ")));
    }));
  console.log("");
};

const notWord = (obj: youdaoResult) => {
  console.log("");
  console.log(orange(obj.query));
  obj.translation.map((transItem) => console.log(blueBright(transItem)));
  console.log("");
  console.log(yellow("除中英外其他语种查询能力较弱"));
  console.error(errorColor("😢这也许不是你想要的结果"));
  console.error(errorColor("😱That might not be the correct answer."));
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
