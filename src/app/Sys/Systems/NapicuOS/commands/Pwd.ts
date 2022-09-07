import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {Line} from "../Apps/console/console.component";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initPwd(): void {
  NapicuOS.register_command(
    new Command('Pwd', SystemCommandsPrefixEnum.pwdCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        resolve({
          linesForCMD: [new Line(`${terminal?.getPath()}`, 'white')],
          stateCode: CommandStateCodeMetadata.success,
        });
      });
    }, "Print full path")
  );
}
