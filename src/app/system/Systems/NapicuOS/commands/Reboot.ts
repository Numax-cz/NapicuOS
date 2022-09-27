import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsArgsEnum, SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {Line} from "../apps/console/console.component";
import {SystemProcessRebootTimeout} from "../SystemComponents/Process/RebootTimeout";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {rebootTimeoutHelpCommand, rebootTimeoutNowHelpCommand} from "../config/commands/help/rebootTimeoutCommand";

export function initReboot(): void {
  NapicuOS.register_command(
    new Command('Reboot', SystemCommandsPrefixEnum.rebootCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        if (params?.length) {
          if(params[0] === SystemCommandsArgsEnum.reboot_kill_process){
            let cmd_lines: Line[] = [];
            NapicuOS.get_system_process_by_title(SystemProcessRebootTimeout.processName).forEach((process) => {
              process.kill();
              cmd_lines.push(new Line(`Killing: ${process.pid} ${SystemProcessRebootTimeout.processName} process`));
            });
            resolve({
              linesForCMD: cmd_lines,
              stateCode: CommandStateCodeMetadata.success,
            });
          }else {
            let time: number = (params?.length && params[0] !== SystemCommandsArgsEnum.reboot_now)? Number(params[0]) :  0;
            NapicuOS.get_system_process_by_title(SystemProcessRebootTimeout.processName).forEach((process) => {
              process.kill();
            });
            new SystemProcessRebootTimeout(time).process.run();
            resolve({
              linesForCMD: [new Line(`System reboots in ${time} ms. ${rebootTimeoutNowHelpCommand.Write().value}`)],
              stateCode: CommandStateCodeMetadata.success,
            });
          }
        } else {
          resolve({
            linesForCMD: [rebootTimeoutHelpCommand],
            stateCode: CommandStateCodeMetadata.HelpCommand,
          });
        }



      });
    }, "Reboot system")
  );
}
