import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {ReturnGetDirByPathMetadata} from "../interface/GetDirByPath";
import {ReplaceSystemVariables} from "../scripts/ReplaceVariables";
import {PathSpliceLastIndex} from "../scripts/PathSplice";
import {SystemStateMetadata} from "../interface/System";
import {notePadPathNotExists} from "../config/commands/help/notePadCommand";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initWordPad(): void {
  NapicuOS.register_command(
    new Command('Notepad', SystemCommandsPrefixEnum.notePadCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        let pathFile: string | undefined = params?.[0];
        if(pathFile){
          let path: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(ReplaceSystemVariables(PathSpliceLastIndex(pathFile).path));

          if(path.state === SystemStateMetadata.PathExist){
            NapicuOS.open_app("Note", [pathFile]);

          }else {
            return resolve({
              linesForCMD: [notePadPathNotExists(pathFile)],
              stateCode: path.state,
            });
          }
        }else NapicuOS.open_app("Note");

        resolve({
          linesForCMD: [],
          stateCode: CommandStateCodeMetadata.success,
        });
        //TODO Return file not exist
      });
    }, "Open notepad application")
  )
}
