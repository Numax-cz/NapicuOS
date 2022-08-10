import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {NapicuOS} from "../system.napicuos";
import {SystemAppsProcessName} from "../config/Apps/AppsNames";

export function initSettings(): void {
  NapicuOS.register_command(new Command('Settings', SystemCommandsPrefixEnum.settingsCommand, (params?: string[], terminal?: TerminalClass) => {
    return new Promise((resolve) => {
      NapicuOS.open_app(SystemAppsProcessName.settings, params);
      resolve({
        linesForCMD: [],
        stateCode: CommandStateCodeMetadata.success,
      });
    });
  }));
}
