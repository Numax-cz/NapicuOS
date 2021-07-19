export interface ToolSettings {
  title: string;
  settings: settings[];
}

export interface settings {
  title: string;
  options: Options[];
  selected: number;
}

export interface Options {
  title?: string;
  date?: Date;
  time?: string;
}

export interface Date {
  hours: string;
  minutes: string;
  seconds: string;
}

//When adding it is necessary to initialize in Type.ts