import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {mkdirHelpCommand} from "../config/commands/help/mkdirCommand";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initClearTerminal(): void {
  NapicuOS.register_command(
    new Command("Cl", SystemCommandsPrefixEnum.clearCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) {
          terminal.lines = [];
        }
        return resolve({
          linesForCMD: [mkdirHelpCommand],
          stateCode: CommandStateCodeMetadata.HelpCommand,
        })
      });
    })
  )
}
