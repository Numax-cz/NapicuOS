import {Process} from './Process';
import {Line} from './Systems/NapicuOS/Apps/console/console.component';

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
    activatedWindow?: Process
  ) => Promise<CommandFunMetadata>;

  /**
   *
   * @param {string} commandName Full command name
   * @param {string} command The expression after which the command function is executed
   * @param {Function} fun Command Function
   */
  constructor(
    commandName: string,
    command: string,
    fun: (
      params: string[] | undefined,
      activatedWindow?: Process
    ) => Promise<CommandFunMetadata>
  ) {
    this._commandName = commandName;
    this._command = command.toLocaleLowerCase();
    this.fun = fun;
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
   * Function that executes the function in the command
   */
  public run = async (
    params?: string[],
    activatedWindow?: Process
  ): Promise<CommandFunMetadata> => {
    return await this.fun(params, activatedWindow);
  };
}
