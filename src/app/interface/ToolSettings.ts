export interface ToolSettings {
  title: string;
  settings: settings[];
}

export interface settings {
  title: string;
  options: Options[];
  date: Date[];
  selected: number;
}

export interface Options {
  title?: string;
  date?: Date[];
  //TODO Time
  //TODO Date TO Time
}

export interface Date {
  title: string;
}

// ! When adding it is necessary to initialize in Type.ts
