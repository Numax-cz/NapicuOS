import {Line} from '../apps/console/console.component';
import {TerminalClass} from "./Terminal";

export declare type CommandFunMetadata = {
  linesForCMD: Line[];
  stateCode: number;
} | void;

export class Command {
  /**
   * Full command name
   */
  private declare readonly _commandName: string;
  /**
   * The expression after which the command function is executed
   */
  private declare readonly _command: string;
  /**
   * Command Function
   */
  private declare readonly fun: (
    params?: string[],
    terminal?: TerminalClass
  ) => Promise<CommandFunMetadata>;
  /**
   * Command help command
   */
  private declare _helpValue: string;

  /**
   * @param {string} commandName Full command name
   * @param {string} command The expression after which the command function is executed
   * @param {Function} fun Command Function
   * @param helpValue
   */
  constructor(
    commandName: string,
    command: string,
    fun: (
      params?: string[], terminal?: TerminalClass
    ) => Promise<CommandFunMetadata>,
    helpValue?: string
  ) {
    this._commandName = commandName;
    this._command = command.toLocaleLowerCase();
    this.fun = fun;
    this._helpValue = helpValue || "";
  }

  /**
   * Returns the command prefix
   */
  get commandName(): string {
    return this._commandName;
  }

  /**
   * Returns the command name
   */
  get command(): string {
    return this._command;
  }

  /**
   * Returns the command help value
   */
  get commandHelp(): string {
    return this._helpValue;
  }

  /**
   * Function that executes the function in the command
   */
  public run = async (
    params?: string[],
    terminal?: TerminalClass
  ): Promise<CommandFunMetadata> => {
    return await this.fun(params, terminal);
  };
}
