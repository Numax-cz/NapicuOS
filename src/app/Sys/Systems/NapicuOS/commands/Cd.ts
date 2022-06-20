import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {SystemStateMetadata} from "../interface/System";
import {changeDirectoryHelpCommand, directoryNotFoundError} from "../config/commands/help/changeDirectoryCommand";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initChangeDirectory(): void {
  NapicuOS.register_command(
    new Command("ChngDir", SystemCommandsPrefixEnum.cdCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (params?.length) {
          //TODO if terminal 1#
          let path: string = params[0];

          if (path.startsWith("..")) {
            let prth: string[] | undefined = terminal?.getPath().split("/");
            prth?.pop();
            if (!prth) return;
            let prthStr = prth.toString().split(",").join("/");
            path = (!prthStr.length) ? "/" : prthStr;
          } else if (!path.startsWith('/')) {
            path = `${terminal?.getPath()}/${path}`;
          }

          let dtChange = NapicuOS.get_dir_by_path(path);
          if (dtChange.state === SystemStateMetadata.PathNotExist) {
            resolve({
              linesForCMD: [directoryNotFoundError(path)],
              stateCode: SystemStateMetadata.PathNotExist,
            });
          } else {
            if (terminal) terminal.setPath(path); //TODO if terminal 2#
            resolve({
              linesForCMD: [],
              stateCode: CommandStateCodeMetadata.success,
            });
          }

        } else {
          resolve({
            linesForCMD: [changeDirectoryHelpCommand],
            stateCode: CommandStateCodeMetadata.HelpCommand,
          });
        }
      });
    })
  )
}
