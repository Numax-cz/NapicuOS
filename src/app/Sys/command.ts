import {Process} from './Process';
import {Line} from './Systems/NapicuOS/Apps/console/console.component';

export declare type CommandFunMetadata = { linesForCMD: Line[]; stateCode: number } | void;

export class Command {
  /**
   * Full command name
   */
  private declare readonly commandName: string;
  /**
   * The expression after which the command function is executed
   */
  private declare readonly command: string;
  /**
   * Command Function
   */
  private declare readonly fun: (params?: string[], activatedWindow?: Process) => Promise<CommandFunMetadata>;

  /**
   *
   * @param {string} commandName Full command name
   * @param {string} command The expression after which the command function is executed
   * @param {Function} fun Command Function
   */
  constructor(
    commandName: string,
    command: string,
    fun: (params: string[] | undefined, activatedWindow?: Process) => Promise<CommandFunMetadata>
  ) {
    this.commandName = commandName;
    this.command = command.toLocaleLowerCase();
    this.fun = fun;
  }

  /**
   * Returns the command prefix
   */
  public get_command(): string {
    return this.command;
  }

  /**
   * Returns the command name
   */
  public get_command_name(): string {
    return this.commandName;
  }

  /**
   * Function that executes the function in the command
   */
  public run = async (params?: string[], activatedWindow?: Process): Promise<CommandFunMetadata> => {
    return await this.fun(params, activatedWindow);
  };
}
