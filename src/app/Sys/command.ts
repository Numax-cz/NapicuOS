import { Lines } from './Systems/NapicuOS/Apps/console/console.component';

export class Command {
  /**
   * All available commands
   */
  public static commands: Command[] = [];
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
  private declare fun: (params: string[] | undefined) => Lines | void;

  /**
   *
   * @param {string}commandName Full command name
   * @param {string}command The expression after which the command function is executed
   * @param {Function}fun Command Function
   */
  constructor(commandName: string, command: string, fun: (params: string[] | undefined) => Lines | void) {
    this.commandName = commandName;
    this.command = command;
    this.fun = fun;
  }

  /**
   * Function that executes the function in the command
   */
  public run = async (params?: string[]): Promise<void | Lines> => {
    return await new Promise((resolve, reject) => {
      resolve(this.fun(params));
    });
  };
}
