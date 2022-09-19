export declare interface typeGameWordsMetadata{
  value: string;
  mistake: boolean;
  letters: typeGameWordsLetterMetadata[];
}

export declare interface typeGameWordsLetterMetadata {
  mistake: boolean | null;
  value: string;
}
