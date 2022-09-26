import {TerminalClass} from "../../SystemComponents/Terminal";

export declare interface CommandParams{
  cmd: string,
  args?: string[],
  terminal?: TerminalClass
}
