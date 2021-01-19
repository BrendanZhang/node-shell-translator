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
  .option("-t, --type <type>", "Confirming original language and target language", "auto")
  .addHelpText(
    "after",
    `
TypeList (Available language):
  cn2en: "Chinese to English",
  cn2jp: "Chinese to Japanese",
  cn2ko: "Chinese to Korean",
  cn2fr: "Chinese to French",
  cn2es: "Chinese to Spanish",
  cn2it: "Chinese to Italian",
  cn2ru: "Chinese to Russian",
  en2cn: "English to Chinese",
  jp2cn: "Japanese to Chinese",
  ko2cn: "Korean to Chinese",
  fr2cn: "French to Chinese",
  es2cn: "Spanish to Chinese",
  it2cn: "Italian to Chinese",
  ru2cn: "Russian to Chinese",
  `,
  )
  .usage("-t <type> [words]")
  .action((words: string, options: { type: string }) => {
    translate(options.type, words);
  });

program.parse(process.argv);
