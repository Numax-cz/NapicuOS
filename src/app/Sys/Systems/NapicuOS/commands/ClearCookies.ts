import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initClearCookiesTerminal(): void {
  NapicuOS.register_command(
    new Command("ClearCookies", SystemCommandsPrefixEnum.clearCookiesCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        NapicuOS.clear_cookies();
        return resolve({
          linesForCMD: [],
          stateCode: CommandStateCodeMetadata.success,
        })
      });
    }, "DEBUG: Clear web app cookies - deletes all system data")
  )
}
