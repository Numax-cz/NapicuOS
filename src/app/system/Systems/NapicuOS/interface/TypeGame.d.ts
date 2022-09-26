export declare interface typeGameWordMetadata {
  value: string;
  mistake: boolean;
  letters: typeGameWordsLetterMetadata[];
}

export declare interface typeGameWordsLetterMetadata {
  mistake: boolean | null;
  value: string;
}

export declare interface typeGameTimerMetadata{
  minutes: number,
  seconds: number
}

export declare interface typeGameScoreMetadata{
  wrongWords: number,
  wrongLetters: number,
  letters: number,
  words: number,
}
