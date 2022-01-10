import { Line } from './console.component';

export declare interface commandLineSt {
  user: string;
  compName: string;
  path: string;
}
export declare type terminalColors =
  | 'blue'
  | 'brightBlack'
  | 'cyan'
  | 'green'
  | 'white'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow';
export declare interface historyCommandsMetadata {
  value: string;
  color: terminalColors;
}

export declare interface inputMetadata {
  lines: Line[];
  enteredCommand: string | undefined;
}
