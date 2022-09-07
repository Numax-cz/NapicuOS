import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initFileManager(): void {
  NapicuOS.register_command(new Command('FileManager', SystemCommandsPrefixEnum.fileManagerCommand, (params?: string[], terminal?: TerminalClass) => {
    return new Promise((resolve) => {
      NapicuOS.open_app("FileManager", params);
      resolve({
        linesForCMD: [],
        stateCode: CommandStateCodeMetadata.success,
      });
    });
  }, "Open file manager application"));
}
