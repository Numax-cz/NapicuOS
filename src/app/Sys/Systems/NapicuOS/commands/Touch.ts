import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {ReturnGetDirByPathMetadata} from "../interface/GetDirByPath";
import {SystemFile} from "../SystemComponents/File";
import {SystemFileTypeEnumMetadata} from "../interface/FilesDirs/File";

export function initTouch(): void {
  NapicuOS.register_command(new Command('Touch', SystemCommandsPrefixEnum.touchCommand, (params?: string[], terminal?: TerminalClass) => {
    return new Promise((resolve) => {
      if (!terminal) return;
      if (params?.length) {
        let fileName: string = params[0]; //TODO Check file name
        let dir: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(terminal.getPath());
        if (dir.data) {
          let i = NapicuOS.add_file_to_dir(dir.data, new SystemFile({
            fileName: params[0],
            fileType: SystemFileTypeEnumMetadata.document,
            value: "",
            createdBy: NapicuOS.get_active_user()?.username || "UNKNOWN"
          }))

          resolve();
        }

      } else {
        //TODO PARAMS is undefined & terminal
      }
    });
  }, "Creat a file"));
}
