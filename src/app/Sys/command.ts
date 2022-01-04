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
  public declare fun: () => void;

  /**
   *
   * @param {string}commandName Full command name
   * @param {string}command The expression after which the command function is executed
   * @param {Function}fun Command Function
   */
  constructor(commandName: string, command: string, fun: () => void) {
    this.commandName = commandName;
    this.command = command;
    this.fun = fun;
    this.register();
  }

  /**
   * Registers the command
   */
  private register(): void {
    if (this.checkIsRegistered()) {
      console.warn(`The ${this.command} command is already registered`);
    } else {
      Command.commands.push(this);
    }
  }

  /**
   *  Checks if the command is already registered
   */
  private checkIsRegistered(): boolean {
    var i: boolean = false;
    for (let index = 0; index < Command.commands.length; index++) {
      const element = Command.commands[index];
      if (element.command == this.command) {
        i = true;
      }
    }
    return i;
  }
  
  /**
   * Function that executes the function in the command
   */
  public static run = () => {
    //TODO Promise
  };
}
