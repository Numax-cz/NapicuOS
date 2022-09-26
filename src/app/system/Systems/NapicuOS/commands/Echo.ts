import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {Line} from "../Apps/console/console.component";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {echoHelpCommand} from "../config/commands/help/echoCommand";

export function initEcho(): void {
  NapicuOS.register_command(
    new Command("Echo", SystemCommandsPrefixEnum.echoCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) {
          if (params?.length) {
            let s = params.toString()
            let line: Line = new Line(s, 'white');
            resolve({
              linesForCMD: [line],
              stateCode: CommandStateCodeMetadata.success,
            });
          } else {
            resolve({
              linesForCMD: [echoHelpCommand],
              stateCode: CommandStateCodeMetadata.HelpCommand,
            });
          }
        }
        resolve();
      });
    }, "Print text on terminal")
  )
}
