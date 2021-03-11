#!/usr/bin/env node
import * as commander from "commander";
import { translate } from "./main";
const { version } = require("../package.json");

const program = new commander.Command();

program;

program
  .version(version)
  .name("fy")
  .arguments("[words]")
  .option(
    "-t, --type <type>",
    "Confirming original language and target language, default are zh2en/en2zh",
    "auto"
  )
  .addHelpText(
    "after",
    `
TypeList (Available language):
  zh2en: "Chinese to English",
  zh2ja: "Chinese to Japanese",
  zh2ko: "Chinese to Korean",
  zh2fr: "Chinese to French",
  zh2es: "Chinese to Spanish",
  zh2it: "Chinese to Italian",
  zh2ru: "Chinese to Russian",
  en2zh: "English to Chinese",
  ja2zh: "Japanese to Chinese",
  ko2zh: "Korean to Chinese",
  fr2zh: "French to Chinese",
  es2zh: "Spanish to Chinese",
  it2zh: "Italian to Chinese",
  ru2zh: "Russian to Chinese",
  `
  )
  .usage("-t <type> [words]")
  .action((words: string, options: { type: string }, command) => {
    const sentence = command.args.join(" ");
    command.args.length > 1 ? translate(options.type, sentence) : translate(options.type, words);
  });

program.parse(process.argv);
