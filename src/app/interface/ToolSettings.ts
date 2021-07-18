export interface ToolSettings {
  title: string;
  settings: settings[];
}

export interface settings {
  title: string;
  options?: Options[];
  advanced?: any;
  selected: number;
  id: number;
}

export interface Options {
  title: string;
}
