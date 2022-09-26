export interface ToolSettings {
  title: string;
  settings: struc;
}

export interface settings {
  title: string;
  options?: Options[];
  time?: BiosTime[];
  date?: BiosDate[];
  optionsFast?: Function | null;
  interval?: any;
  description: string;
  selected: number;
}

export interface struc {
  [index: string]: settings;
}

export interface Options {
  title: string;
}

export interface BiosTime {
  title: string;
}

export interface BiosDate {
  title: string;
}

// ! When adding it is necessary to initialize in Type.ts
