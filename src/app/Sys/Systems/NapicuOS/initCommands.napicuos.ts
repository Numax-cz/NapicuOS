import { Command } from '../../command';
import { Line } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';
import { removeSpace } from './scripts/removeSpaceInString';
import { getHelpCommand, getHelpCommandAPPS } from './config/commands/help/getCommand';
import { SystemFile } from '../../File';
import { CommandStateCodeMetadata } from './interface/Commands/commandsCodes';
import { setHelpCommand } from './config/commands/help/setCommand';
import { addUserUsage } from './config/commands/help/addUserCommand';
import { User } from '../../User';
import { NapicuOSSystemDir } from './config/drive';
function unknownOption(param: string): Line {
  return new Line(`Invalid option '${param}'`, 'white');
}

function usageCommand(cmd: string): Line {
  return new Line(`usage: ${cmd}`);
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', 'shell', (params, activatedWindow) => {
      return new Promise((resolve) => {
        function testFunction(): void {
          console.log(NapicuOS.get_apps_dir());
        }
        resolve(testFunction());
      });
    })
  );
  initGetSystemInformation();
  initExitFromConsole();
  initSetSystemInformation();
  initKillProcess();
  initCreateUser();
  initLogout();
  initLogout();
  initOpenApp();
}

function initCreateUser(): void {
  NapicuOS.register_command(
    new Command(
      'CreateUser',
      'adduser',
      (params) => {
        return new Promise((resolve) => {
          if (params?.length == 2) {
            var username = params[0];
            var password = params[1];
            var x = NapicuOS.get_users().filter((value) => {
              return value.get_username() === username;
            });
            if (!x.length) {
              resolve(NapicuOS.add_user(new User(username, password)));
            } else {
              console.log('není');
            }
          } else {
            resolve({ linesForCMD: [addUserUsage], stateCode: CommandStateCodeMetadata.HelpCommand });
          }
        });
      },
      'superUser'
    )
  );
}

function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemGetter', 'get', (params) => {
      return new Promise((resolve) => {
        if (params?.length) {
          switch (params[0]) {
            case '--help':
              resolve({ linesForCMD: [getHelpCommand], stateCode: CommandStateCodeMetadata.HelpCommand });
              break;
            case 'systemprocess':
              var process = NapicuOS.get_system_process();
              var exportLines: Line[] = [];
              exportLines.push(new Line('Processes running in the background: ', 'white'));
              process.forEach((value: Process, index: number) => {
                exportLines.push(new Line(`${index} | ${value.processTitle} : ${value.launchedBy}`, 'white'));
              });
              return resolve({ linesForCMD: exportLines, stateCode: CommandStateCodeMetadata.success });
            case 'apps':
              var exportLines: Line[] = [];
              var apps: Process[] = NapicuOS.get_system_window_apps();
              if (params[1]) {
                switch (params[1]) {
                  case '--open':
                    exportLines.push(new Line('GUI applications that are currently open: ', 'white'));
                    apps = NapicuOS.get_system_displayed_window_apps();
                    break;
                  case '--close':
                    exportLines.push(new Line('GUI applications that are currently closed: ', 'white'));
                    apps = NapicuOS.get_system_no_displayed_window_apps();
                    break;
                  default:
                    resolve({
                      linesForCMD: [unknownOption(params[1]), getHelpCommandAPPS],
                      stateCode: CommandStateCodeMetadata.UnknownOption,
                    });
                    break;
                }
              } else {
                exportLines.push(new Line('GUI applications running in the background: ', 'white'));
              }

              apps.forEach((value: Process, index: number) => {
                exportLines.push(new Line(`${index} | ${value.processTitle}`, 'white'));
              });
              return resolve({ linesForCMD: exportLines, stateCode: CommandStateCodeMetadata.success });

            case 'commands':
              var commands = NapicuOS.get_available_commands();
              var exportLines: Line[] = [];
              commands.forEach((value: SystemFile, index: number) => {
                exportLines.push(
                  new Line(
                    `${index} | ${value.get_value().commandName} : ${value.get_value().command} `,
                    'white'
                  )
                );
              });
              return resolve({ linesForCMD: exportLines, stateCode: CommandStateCodeMetadata.success });

            default:
              resolve({
                linesForCMD: [unknownOption(removeSpace(params[0])), getHelpCommand],
                stateCode: CommandStateCodeMetadata.UnknownOption,
              });
              break;
          }
        }
        resolve({ linesForCMD: [getHelpCommand], stateCode: CommandStateCodeMetadata.HelpCommand });
      });
    })
  );
}

function initSetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemSetter', 'set', (params, activatedWindow) => {
      return new Promise((resolve) => {
        if (params?.length) {
          switch (params[0]) {
            case 'windowtitle':
              return resolve(activatedWindow?.Window.setWindowTitle(params[1]));
            default:
              resolve({
                linesForCMD: [unknownOption(params[0])],
                stateCode: CommandStateCodeMetadata.UnknownOption,
              });
          }
        } else {
          //TODO
          resolve({ linesForCMD: [setHelpCommand], stateCode: CommandStateCodeMetadata.HelpCommand });
        }
      });
    })
  );
}

function initKillProcess(): void {
  NapicuOS.register_command(
    new Command(
      'SystemProcessKiller',
      'kill',
      (params) => {
        return new Promise((resolve) => {
          if (params?.length) {
            if (params[0]) {
              var x = NapicuOS.get_system_process_by_title(params[0]);
              if (x) resolve(x.kill());
              resolve({
                linesForCMD: [new Line(`Process '${params[0]}' not found`)],
                stateCode: CommandStateCodeMetadata.ProcessNotFound,
              });
            }
          } else {
            resolve({
              linesForCMD: [usageCommand(`kill <process_name>`)],
              stateCode: CommandStateCodeMetadata.success,
            });
          }
        });
      },
      'superUser'
    )
  );
}

function initLogout(): void {
  NapicuOS.register_command(
    new Command('UserLogout', 'logout', (params) => {
      return new Promise((resolve) => {
        resolve(NapicuOS.logout_user_and_kill_user_process());
      });
    })
  );
}

function initExitFromConsole(): void {
  NapicuOS.register_command(
    new Command('Exit', 'exit', (params, activatedWindow) => {
      return new Promise((resolve) => {
        resolve(activatedWindow?.kill());
      });
    })
  );
}

function initOpenApp(): void {
  NapicuOS.register_command(
    new Command('OpenApp', 'openapp', (params, activatedWindow) => {
      return new Promise((resolve) => {
        if (params?.length) {
          var x = NapicuOS.open_file_in_dir(NapicuOS.get_apps_dir(), params[0]);

          resolve({ linesForCMD: [new Line(`RUN : ${x}`)], stateCode: x });
        }
      });
    })
  );
}
