import { Process } from './Process';
import { Line } from './Systems/NapicuOS/Apps/console/console.component';
import { CommandStateCodeMetadata } from './Systems/NapicuOS/interface/Commands/commandsCodes';
export declare type CommandFunMetadata = { linesForCMD: Line[]; stateCode:number } | void;
export class Command {
  /**
   * Full command name
   */
  public declare commandName: string;
  /**
   * The expression after which the command function is executed
   */
  public declare command: string;
  /**
   * Command Function
   */
  private declare fun: (params?: string[], activatedWindow?: Process) => Promise<CommandFunMetadata>;

  /**
   *
   * @param {string}commandName Full command name
   * @param {string}command The expression after which the command function is executed
   * @param {Function}fun Command Function
   */
  constructor(
    commandName: string,
    command: string,
    fun: (params: string[] | undefined, activatedWindow?: Process) => Promise<CommandFunMetadata>
  ) {
    this.commandName = commandName;
    this.command = command;
    this.fun = fun;
  }

  /**
   * Function that executes the function in the command
   */
  public run = async (params?: string[], activatedWindow?: Process): Promise<CommandFunMetadata> => {
    return await this.fun(params, activatedWindow);
  };
}
