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
    "us-phonetic"?: string;
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
  isWord: boolean;
};

export interface ILangList {
  [key: string]: (obj: youdaoResult) => void;
  notWord: (obj: youdaoResult) => void;
}

export interface IErrorCodeMessage {
  [key: string]: string;
}

export interface IAvailableLang {
  [key: string]: string;
}

export interface ITypeResult {
  from: string;
  to: string;
}
