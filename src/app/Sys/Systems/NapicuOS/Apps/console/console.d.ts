export declare interface commandLineSt {
  user: string;
  compName: string;
  path: string;
}
export declare type terminalColors ='blue' | 'brightBlack' | 'cyan' | 'green' | 'white' | 'purple' | 'red' | 'white' | 'yellow';
export declare interface historyCommandsSt {
  value: string[];
  color: terminalColors;
  enteredCommand?: string;
}
