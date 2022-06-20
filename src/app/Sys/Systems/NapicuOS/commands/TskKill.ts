import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {Line} from "../Apps/console/console.component";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";

export function initKillProcess(): void {
  NapicuOS.register_command(
    new Command('TskKill', SystemCommandsPrefixEnum.killCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        if (params?.length) {
          let pid = params[0]
          if (pid) {
            let x = NapicuOS.get_system_process_by_pid(Number(pid));
            if (x) resolve(x.kill());
            resolve({
              linesForCMD: [new Line(`Process with pid'${params[0]}' not found`)],
              stateCode: CommandStateCodeMetadata.ProcessNotFound,
            });
          }
        } else {
          resolve({
            linesForCMD: [usageCommand(`kill <pid>`)],
            stateCode: CommandStateCodeMetadata.success,
          });
        }
      });
    })
  );
}
