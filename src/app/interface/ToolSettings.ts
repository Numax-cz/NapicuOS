export interface ToolSettings {
  title: string;
  settings: settings[];
}

export interface settings {
  title: string;
  options: Options[];
  selected: number;
  id: number;
}

export interface Options {
  title: string;
}
