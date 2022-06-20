import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {TerminalClass} from "../SystemComponents/Terminal";
import {systemDirAFileMetadata} from "../interface/FilesDirs/SystemDir";
import {Line} from "../Apps/console/console.component";
import {SystemFile} from "../SystemComponents/File";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initLs(): void {
  NapicuOS.register_command(
    new Command("Ls", SystemCommandsPrefixEnum.listCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        let listPath = terminal?.getPath();
        if (listPath) {
          let terminalPathData: systemDirAFileMetadata | null = NapicuOS.get_dir_by_path(listPath).data;

          if (terminalPathData) {
            let exportLinest: Line[] = [];

            let dirsName: systemDirAFileMetadata = terminalPathData;

            //Dirs
            if (dirsName.dir) {
              Object.keys(dirsName.dir).forEach((keys: string) => {
                let line: Line = new Line(`${keys}`, 'white');
                exportLinest.push(line);
              });
            }

            //Files
            if (dirsName.files) {
              dirsName.files.forEach((file: SystemFile) => {
                let line: Line = new Line(`${file.fileName}`, 'white');
                exportLinest.push(line);
              });
            }

            resolve({
              linesForCMD: exportLinest,
              stateCode: CommandStateCodeMetadata.success,
            });
          }
        }
      });
    })
  )
}
