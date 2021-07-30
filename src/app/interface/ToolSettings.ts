export interface ToolSettings {
  title: string;
  settings: settings[];
}

export interface settings {
  title: string;
  options: Options[];
  time: Time[];
  date: Date[];
  optionsFast: Function | null;
  interval?: any;
  description: string;
  selected: number;
}

export interface Options {
  title: string;
}

export interface Time {
  title: string;
}
export interface Date {
  title: string;
}

// ! When adding it is necessary to initialize in Type.ts
