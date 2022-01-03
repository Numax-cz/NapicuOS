
import { CommandVal } from './Systems/NapicuOS/interface/Command/Command';

export class Command {
  public static commands: CommandVal[];

  constructor(command: string, fun: () => void) {
    Command.commands.push({ command: command, fun: fun });
  }

  public static run = (command: string) => {
    //TODO Promise
  };
}
