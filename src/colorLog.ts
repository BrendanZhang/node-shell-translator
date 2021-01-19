import { blue, blueBright, cyanBright, greenBright, grey, whiteBright, yellow, yellowBright, cyan } from "chalk";
import { ILangList, youdaoResult } from "./common";
const chalk = require("chalk");
const orange = chalk.keyword("orange");

const en2zh = (obj: youdaoResult) => {
  console.log(obj);
  console.log("");
  console.log(orange(obj.returnPhrase));
  console.log(yellowBright(`英 [${obj.basic["uk-phonetic"]}]`), yellowBright(`美 [${obj.basic.phonetic}]`));
  console.log("");
  obj.basic.explains.map((explain) => {
    const formattedExplain = explain.split(". ");
    console.log(`${chalk.cyan(formattedExplain[0] + ".")} ${chalk.blue(formattedExplain[1])}`);
  });
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
    (console.log(cyanBright("短语")),
    obj.web.map((webExplain) => {
      console.log(blue(webExplain.key) + " " + blueBright(webExplain.value.join(" ; ")));
    }));
  console.log("");
  console.log(grey(obj.basic.exam_type.join(" ")));
};

const langList: ILangList = {
  ["en2zh-CHS"]: en2zh,
};

export const display = (obj: youdaoResult) => {
  langList[obj.l](obj);
};
