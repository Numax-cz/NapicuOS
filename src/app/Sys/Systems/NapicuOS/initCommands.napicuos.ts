import {Command} from '../../command';
import {Line} from './Apps/console/console.component';
import {NapicuOS} from './system.napicuos';
import {Process} from '../../Process';
import {removeSpace} from './scripts/removeSpaceInString';
import {getHelpCommand, getHelpCommandAPPS,} from './config/commands/help/getCommand';
import {SystemFile} from '../../File';
import {CommandStateCodeMetadata} from './interface/Commands/commandsCodes';
import {setHelpCommand, setWindowTitleHelpCommand} from './config/commands/help/setCommand';
import {addUserUsage} from './config/commands/help/addUserCommand';
import {User} from '../../User';
import {SystemCommandsPrefixEnum} from "./interface/Commands/commands";

function unknownOption(param: string): Line {
  return new Line(`Invalid option '${param}'`, 'white');
}

function usageCommand(cmd: string): Line {
  return new Line(`usage: ${cmd}`);
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', SystemCommandsPrefixEnum.shellCommand, (params, activatedWindow) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          User.defaultUserSettings.appsInDock = [];
          resolve();
        }, 200);
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
    new Command('CreateUser', SystemCommandsPrefixEnum.addUserCommand, (params) => {
      return new Promise((resolve) => {
        if (params?.length == 2) {
          let username = params[0];
          let password = params[1];
          let x = NapicuOS.get_users().filter((value) => {
            return value.username === username;
          });
          if (!x.length) {
            resolve(NapicuOS.add_user(new User(username, password)));
          }
          //TODO ERROR ELSE
        } else {
          resolve({
            linesForCMD: [addUserUsage],
            stateCode: CommandStateCodeMetadata.HelpCommand,
          });
        }
      });
    })
  );
}

function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemGetter', SystemCommandsPrefixEnum.getCommand, (params) => {
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
                    `${index} | ${value.processTitle} : ${value.launchedBy}`,
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
                  new Line(`${index} | ${value.processTitle}`, 'white')
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

function initSetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemSetter', SystemCommandsPrefixEnum.setCommand, (params, activatedWindow) => {
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

function initKillProcess(): void {
  NapicuOS.register_command(
    new Command('SystemProcessKiller', SystemCommandsPrefixEnum.killCommand, (params) => {
      return new Promise((resolve) => {
        if (params?.length) {
          if (params[0]) {
            let x = NapicuOS.get_system_process_by_title(params[0]);
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
    })
  );
}

function initLogout(): void {
  NapicuOS.register_command(
    new Command('UserLogout', SystemCommandsPrefixEnum.logoutCommand, (params) => {
      return new Promise((resolve) => {
        resolve(NapicuOS.logout_user());
      });
    })
  );
}

function initExitFromConsole(): void {
  NapicuOS.register_command(
    new Command('Exit', SystemCommandsPrefixEnum.exitCommand, (params, activatedWindow) => {
      return new Promise((resolve) => {
        resolve(activatedWindow?.kill());
      });
    })
  );
}

function initOpenApp(): void {
  NapicuOS.register_command(
    new Command('OpenApp', SystemCommandsPrefixEnum.openAppCommand, (params, activatedWindow) => {
      return new Promise((resolve) => {
        if (params?.length) {
          let x = NapicuOS.open_file_in_dir(NapicuOS.get_apps_dir(), params[0]);
          resolve({linesForCMD: [new Line(`RUN : ${x}`)], stateCode: x});
        }
      });
    })
  );
}
