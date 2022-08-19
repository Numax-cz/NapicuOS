import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {Line} from "../Apps/console/console.component";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {calcHelpCommand} from "../config/commands/help/Calc";

export function initEval(): void {
  NapicuOS.register_command(
    new Command("Calc", SystemCommandsPrefixEnum.echoCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) {
          if (params?.length) {
            let s = params.toString()
            let line: Line = new Line(eval(s), 'white'); //Dude eval is the best 100% SAFE function ever YOLOOO
            resolve({
              linesForCMD: [line],
              stateCode: CommandStateCodeMetadata.success,
            });
          } else {
            resolve({
              linesForCMD: [calcHelpCommand],
              stateCode: CommandStateCodeMetadata.HelpCommand,
            });
          }
        }
        resolve();
      });
    })
  )
}
