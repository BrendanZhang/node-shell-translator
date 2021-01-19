export type youdaoResult = {
  returnPhrase: string[]; // 需要
  errorCode: string;
  query: string;
  translation: string[]; // 需要
  basic: {
    // 需要
    exam_type: string[];
    phonetic?: string;
    "uk-phonetic"?: string;
    "uk-speech"?: string;
    "us-speech"?: string;
    wfs: { wf: { name: string; value: string[] } }[];
    explains: string[];
  };
  web?: { key: string; value: string[] }[];
  l: string; // 需要
  dict: {
    url: string;
  };
  webdict: {
    url: string;
  };
  tSpeakUrl: string;
  speakUrl: string;
};

export interface ILangList {
  [key: string]: (obj: youdaoResult) => void;
}

export interface IErrorCodeMessage {
  [key: string]: string;
}
