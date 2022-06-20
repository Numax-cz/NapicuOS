import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {Line} from "../Apps/console/console.component";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {
  setHelpCommand,
  setHostnameHelpCommand,
  setHostnameLongError, setHostnameSet,
  setHostnameShortError,
  setWindowTitleHelpCommand
} from "../config/commands/help/setCommand";
import {SystemStateMetadata} from "../interface/System";
import {unknownOption} from "./scripts/unknownOption";

export function initSetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SysSet', SystemCommandsPrefixEnum.setCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        if (params?.length) {
          switch (params[0]) {
            case 'windowtitle':
              if (params[1]) {
                let process = NapicuOS.get_system_process_by_pid(Number(params[1]));
                if (process) {
                  if (params[2]) {
                    if (process?.Window) {
                      resolve(process.Window.setWindowTitle(params[2]));
                    } else {
                      resolve({
                        linesForCMD: [new Line('Process is not a GUI application')],
                        stateCode: CommandStateCodeMetadata.ProcessNotGUI,
                      });
                    }
                  } else {
                    resolve({
                      linesForCMD: [setWindowTitleHelpCommand],
                      stateCode: CommandStateCodeMetadata.HelpCommand,
                    });
                  }
                } else {
                  resolve({
                    linesForCMD: [new Line('Invalid PID')],
                    stateCode: CommandStateCodeMetadata.InvalidPID,
                  });
                }
              } else {
                resolve({
                  linesForCMD: [setWindowTitleHelpCommand],
                  stateCode: CommandStateCodeMetadata.HelpCommand,
                });
              }
              break;
            case "hostname":
              if (params[1]) {
                var rtn = NapicuOS.set_hostname(params[1]);
                if (rtn === SystemStateMetadata.StringTooShort) {
                  resolve({
                    linesForCMD: [setHostnameShortError],
                    stateCode: rtn,
                  });
                } else if (rtn === SystemStateMetadata.StringTooLong) {
                  resolve({
                    linesForCMD: [setHostnameLongError],
                    stateCode: rtn
                  });
                }
                resolve({
                  linesForCMD: [setHostnameSet(params[1])],
                  stateCode: rtn
                });
              } else {
                resolve({
                  linesForCMD: [setHostnameHelpCommand],
                  stateCode: CommandStateCodeMetadata.HelpCommand,
                });
              }
              break;
            default:
              resolve({
                linesForCMD: [unknownOption(params[0])],
                stateCode: CommandStateCodeMetadata.UnknownOption,
              });
          }
        } else {
          //TODO
          resolve({
            linesForCMD: [setHelpCommand],
            stateCode: CommandStateCodeMetadata.HelpCommand,
          });
        }
      });
    })
  );
}
