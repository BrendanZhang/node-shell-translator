import { IAvailableLang, ITypeResult } from "./common";

export const availableLang: IAvailableLang = {
  cn2en: "zh-CHS2en",
  cn2jp: "zh-CHS2ja",
  cn2ko: "zh-CHS2ko",
  cn2fr: "zh-CHS2fr",
  cn2es: "zh-CHS2es",
  cn2it: "zh-CHS2it",
  cn2ru: "zh-CHS2ru",
  en2cn: "en2zh-CHS",
  jp2cn: "ja2zh-CHS",
  ko2cn: "ko2zh-CHS",
  fr2cn: "fr2zh-CHS",
  es2cn: "es2zh-CHS",
  it2cn: "it2zh-CHS",
  ru2cn: "ru2zh-CHS",
};

export const langType = (type: string): false | ITypeResult => {
  return type !== "auto"
    ? availableLang[type]
      ? { from: availableLang[type].split("2")[0], to: availableLang[type].split("2")[1] }
      : false
    : { from: "auto", to: "auto" };
};
