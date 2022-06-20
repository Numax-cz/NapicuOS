import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {Line} from "../Apps/console/console.component";

export function initOpenApp(): void {
  NapicuOS.register_command(
    new Command('OpenApp', SystemCommandsPrefixEnum.openAppCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        if (params?.length) {
          let x = NapicuOS.open_file_in_dir(NapicuOS.get_usr_dir(), params);
          resolve({linesForCMD: [new Line(`RUN : ${x}`)], stateCode: x});
        }
      });
    })
  );
}
