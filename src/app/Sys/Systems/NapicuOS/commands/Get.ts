import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {Line} from "../Apps/console/console.component";
import {getHelpCommand, getHelpCommandAPPS} from "../config/commands/help/getCommand";
import {CommandStateCodeMetadata} from "../interface/Commands/CommandsCodes";
import {Process} from "../SystemComponents/Process";
import {User} from "../SystemComponents/User";
import {SystemFile} from "../SystemComponents/File";
import {removeSpace} from "../scripts/removeSpaceInString";
import {unknownOption} from "./scripts/unknownOption";

export function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SysGet', SystemCommandsPrefixEnum.getCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        let exportLines: Line[] = [];
        if (params?.length) {
          switch (params[0]) {
            case '--help':
              resolve({
                linesForCMD: [getHelpCommand],
                stateCode: CommandStateCodeMetadata.HelpCommand,
              });
              break;
            case 'systemprocess':
              let process = NapicuOS.get_system_process();
              exportLines.push(
                new Line('Processes running in the background: ', 'white')
              );
              process.forEach((value: Process, index: number) => {
                exportLines.push(
                  new Line(
                    `${value.pid} | ${value.processTitle} : ${value.launchedBy}`,
                    'white'
                  )
                );
              });
              return resolve({
                linesForCMD: exportLines,
                stateCode: CommandStateCodeMetadata.success,
              });
            case 'apps':
              let apps: Process[] = NapicuOS.get_system_window_apps();
              if (params[1]) {
                switch (params[1]) {
                  case '--open':
                    exportLines.push(
                      new Line(
                        'GUI applications that are currently open: ',
                        'white'
                      )
                    );
                    apps = NapicuOS.get_system_displayed_window_apps();
                    break;
                  case '--close':
                    exportLines.push(
                      new Line(
                        'GUI applications that are currently closed: ',
                        'white'
                      )
                    );
                    apps = NapicuOS.get_system_no_displayed_window_apps();
                    break;
                  default:
                    resolve({
                      linesForCMD: [
                        unknownOption(params[1]),
                        getHelpCommandAPPS,
                      ],
                      stateCode: CommandStateCodeMetadata.UnknownOption,
                    });
                    break;
                }
              } else {
                exportLines.push(
                  new Line(
                    'GUI applications running in the background: ',
                    'white'
                  )
                );
              }
              apps.forEach((value: Process, index: number) => {
                exportLines.push(
                  new Line(`${value.pid} | ${value.processTitle}`, 'white')
                );
              });
              return resolve({
                linesForCMD: exportLines,
                stateCode: CommandStateCodeMetadata.success,
              });
            case 'users':
              let users = NapicuOS.get_users();
              users.forEach((user: User, index: number) => {
                exportLines.push(
                  new Line(
                    `${index} | ${user.username} :
                running: ${NapicuOS.get_if_user_active(user.username)}
                permissions: ${user.permissions}`,
                    'white')
                );
              });
              return resolve({
                linesForCMD: exportLines,
                stateCode: CommandStateCodeMetadata.success,
              });
            case 'commands':
              let commands = NapicuOS.get_available_commands();
              commands.forEach((value: SystemFile, index: number) => {
                exportLines.push(
                  new Line(
                    `${index} | ${value.value.commandName} : ${
                      value.value.command
                    } `,
                    'white'
                  )
                );
              });
              return resolve({
                linesForCMD: exportLines,
                stateCode: CommandStateCodeMetadata.success,
              });

            default:
              resolve({
                linesForCMD: [
                  unknownOption(removeSpace(params[0])),
                  getHelpCommand,
                ],
                stateCode: CommandStateCodeMetadata.UnknownOption,
              });
              break;
          }
        }
        resolve({
          linesForCMD: [getHelpCommand],
          stateCode: CommandStateCodeMetadata.HelpCommand,
        });
      });
    })
  );
}
