import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {ReturnGetDirByPathMetadata} from "../interface/GetDirByPath";
import {SystemDirStateData, SystemStateMetadata} from "../interface/System";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {mkdirExists, mkdirHelpCommand} from "../config/commands/help/mkdirCommand";

export function initMkdir(): void {
  NapicuOS.register_command(new Command('Mkdir', SystemCommandsPrefixEnum.mkdirCommand, (params?: string[], terminal?: TerminalClass) => {
    return new Promise((resolve) => {
      if (params?.length) {
        let pth_dir: string | undefined = terminal?.getPath();
        if (!pth_dir) {
          console.error("SYSTEM Terminal dir is undefined");
          return;
        }
        let pth_gt_dir: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(pth_dir);
        if (pth_gt_dir.state === SystemStateMetadata.PathExist && pth_gt_dir.data?.dir) {

          let dir_crt_dir: SystemDirStateData = NapicuOS.creat_dir(pth_gt_dir.data, params[0]);

          if (dir_crt_dir === SystemStateMetadata.DirNotExist) {
            resolve({
              linesForCMD: [],
              stateCode: CommandStateCodeMetadata.success
            })
          } else {
            resolve({
              linesForCMD: [mkdirExists(params[0])],
              stateCode: SystemStateMetadata.DirExist
            })
          }
        } else {
          console.error("SYSTEM Fatal error with dirs system");
          return;
        }
      }
      return resolve({
        linesForCMD: [mkdirHelpCommand],
        stateCode: CommandStateCodeMetadata.HelpCommand,
      })
    });
  }, "Create a directory"));
}
