import { IAvailableLang, ITypeResult } from "./common";

export const availableLang: IAvailableLang = {
  zh2en: "zh-CHS2en",
  zh2ja: "zh-CHS2ja",
  zh2ko: "zh-CHS2ko",
  zh2fr: "zh-CHS2fr",
  zh2es: "zh-CHS2es",
  zh2it: "zh-CHS2it",
  zh2ru: "zh-CHS2ru",
  en2zh: "en2zh-CHS",
  ja2zh: "ja2zh-CHS",
  ko2zh: "ko2zh-CHS",
  fr2zh: "fr2zh-CHS",
  es2zh: "es2zh-CHS",
  it2zh: "it2zh-CHS",
  ru2zh: "ru2zh-CHS",
};

export const langType = (type: string): false | ITypeResult => {
  return type !== "auto"
    ? availableLang[type]
      ? { from: availableLang[type].split("2")[0], to: availableLang[type].split("2")[1] }
      : false
    : { from: "auto", to: "auto" };
};
