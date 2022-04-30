import {Line} from '../../Apps/console/console.component';
import {systemDirAFileMetadata} from "../FilesDirs/SystemDir";

export declare interface commandLineStMetadata {
  user: string;
  compName: string;
  path: string;
}

export declare type terminalColorsMetadata =
  | 'blue'
  | 'brightBlack'
  | 'cyan'
  | 'green'
  | 'white'
  | 'purple'
  | 'red'
  | 'yellow';

export declare interface historyCommandsMetadata {
  value: string;
  color: terminalColorsMetadata;
}

export declare interface inputMetadata {
  lines: Line[];
  enteredCommand: string | undefined;
}

