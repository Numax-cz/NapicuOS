import {Command} from './SystemComponents/Command';
import {Line} from './Apps/console/console.component';
import {NapicuOS} from './system.napicuos';
import {Process} from './SystemComponents/Process';
import {removeSpace} from './scripts/removeSpaceInString';
import {getHelpCommand, getHelpCommandAPPS,} from './config/commands/help/getCommand';
import {SystemFile} from './SystemComponents/File';
import {CommandStateCodeMetadata} from './interface/Commands/commandsCodes';
import {
  setHelpCommand,
  setHostnameHelpCommand,
  setHostnameLongError,
  setHostnameSet,
  setHostnameShortError,
  setWindowTitleHelpCommand
} from './config/commands/help/setCommand';
import {
  addUserAdded,
  addUserExists,
  addUserLongError,
  addUserShortError,
  addUserUsage
} from './config/commands/help/addUserCommand';
import {User} from './SystemComponents/User';
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";
import {SystemNotification} from "./SystemComponents/Notification";
import {SystemStateMetadata, SystemUserStateData} from './interface/System';
import {echoHelpCommand} from "./config/commands/help/echoCommand";
import {changeDirectoryHelpCommand, directoryNotFoundError} from "./config/commands/help/changeDirectoryCommand";
import {systemDirAFileMetadata, systemDirMetadata} from './interface/FilesDirs/systemDir';
import {TerminalClass} from "./SystemComponents/Terminal";

function unknownOption(param: string): Line {
  return new Line(`Invalid option '${param}'`, 'white');
}

function usageCommand(cmd: string): Line {
  return new Line(`usage: ${cmd}`);
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', SystemCommandsPrefixEnum.shellCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          NapicuOS.add_notification_to_queue_and_push(new SystemNotification({
            msg: "xd", title: "xd", command: {commandName: "systest", args: []}
          }));
          resolve();
        }, 200);
      });
    })
  );

  NapicuOS.register_command(
    new Command('TestCommand2', "systest", (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) terminal.displayedPath = "XDXDXDD";
      });
    })
  );

  initGetSystemInformation();
  initExitFromConsole();
  initClearTerminal();
  initEcho();
  initLs();
  initPwd();
  initChangeDirectory();
  initSetSystemInformation();
  initKillProcess();
  initCreateUser();
  initLogout();
  initOpenApp();
}


// function initAddFile(): void {
//   NapicuOS.register_command(new Command('CreatFile', SystemCommandsPrefixEnum.creatFile, (params: string[] | undefined) => {
//     return new Promise((resolve) => {
//       if (params?.length) {
//
//         let fileName: string = params[0]; //TODO Check file name
//
//
//       } else {
//         //TODO PARAMS is undefined
//       }
//     });
//   }));
// }

function initClearTerminal(): void {
  NapicuOS.register_command(
    new Command("ClearTerminal", SystemCommandsPrefixEnum.clearCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) {
          terminal.lines = [];
        }
        resolve();
      });
    })
  )
}

function initLs(): void {
  NapicuOS.register_command(
    new Command("ListCommand", SystemCommandsPrefixEnum.listCommand, (params?: string[], terminal?: TerminalClass) => {
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

function initPwd(): void {
  NapicuOS.register_command(
    new Command('Pwd', SystemCommandsPrefixEnum.pwdCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        resolve({
          linesForCMD: [new Line(`${terminal?.getPath()}`, 'white')],
          stateCode: CommandStateCodeMetadata.success,
        });
      });
    })
  );
}


function initEcho(): void {
  NapicuOS.register_command(
    new Command("Echo", SystemCommandsPrefixEnum.echoCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) {
          if (params?.length) {
            let s = params.toString()
            let line: Line = new Line(s, 'white');
            resolve({
              linesForCMD: [line],
              stateCode: CommandStateCodeMetadata.success,
            });
          } else {
            resolve({
              linesForCMD: [echoHelpCommand],
              stateCode: CommandStateCodeMetadata.HelpCommand,
            });
          }
        }
        resolve();
      });
    })
  )
}

function initChangeDirectory(): void {
  NapicuOS.register_command(
    new Command("ChangeDirectory", SystemCommandsPrefixEnum.cdCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (params?.length) {
          //TODO if terminal 1#
          let path: string = params[0];

          if (path.startsWith("..")) {
            let prth: string[] | undefined = terminal?.getPath().split("/");
            prth?.pop();
            if (!prth) return;
            let prthStr = prth.toString();
            path = (!prthStr.length) ? "/" : prthStr;
          } else if (!path.startsWith('/')) {
            path = `${terminal?.getPath()}/${path}`;
          }

          let dtChange = NapicuOS.get_dir_by_path(path);
          if (dtChange.state === SystemStateMetadata.PathNotExist) {
            resolve({
              linesForCMD: [directoryNotFoundError(path)],
              stateCode: SystemStateMetadata.PathNotExist,
            });
          } else {
            if (terminal) terminal.setPath(path); //TODO if terminal 2#
            resolve({
              linesForCMD: [],
              stateCode: CommandStateCodeMetadata.success,
            });
          }

        } else {
          resolve({
            linesForCMD: [changeDirectoryHelpCommand],
            stateCode: CommandStateCodeMetadata.HelpCommand,
          });
        }
      });
    })
  )
}


function initCreateUser(): void {
  NapicuOS.register_command(
    new Command('CreateUser', SystemCommandsPrefixEnum.addUserCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        if (params?.length == 2) {
          let username = params[0];
          let password = params[1];

          let usr: SystemUserStateData = NapicuOS.add_user(new User({username: username, password: password}));
          if (usr === SystemStateMetadata.StringTooShort) {
            resolve({
              linesForCMD: [addUserShortError],
              stateCode: usr,
            });
          } else if (usr === SystemStateMetadata.StringTooLong) {
            resolve({
              linesForCMD: [addUserLongError],
              stateCode: usr,
            });
          } else if (usr === SystemStateMetadata.UserExists) {
            resolve({
              linesForCMD: [addUserExists(username)],
              stateCode: usr,
            });
          }
          resolve({
            linesForCMD: [addUserAdded(username)],
            stateCode: usr,
          });

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
    new Command('SystemGetter', SystemCommandsPrefixEnum.getCommand, (params: string[] | undefined) => {
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

function initSetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemSetter', SystemCommandsPrefixEnum.setCommand, (params: string[] | undefined) => {
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

function initKillProcess(): void {
  NapicuOS.register_command(
    new Command('SystemProcessKiller', SystemCommandsPrefixEnum.killCommand, (params) => {
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

function initLogout(): void {
  NapicuOS.register_command(
    new Command('UserLogout', SystemCommandsPrefixEnum.logoutCommand, (params) => {
      return new Promise((resolve) => {
        NapicuOS.logout_user();
        resolve();
      });
    })
  );
}

function initExitFromConsole(): void {
  NapicuOS.register_command(
    new Command('Exit', SystemCommandsPrefixEnum.exitCommand, (params) => {
      return new Promise((resolve) => {
        resolve(NapicuOS.get_system_activated_window_app()?.kill());
      });
    })
  );
}

function initOpenApp(): void {
  NapicuOS.register_command(
    new Command('OpenApp', SystemCommandsPrefixEnum.openAppCommand, (params) => {
      return new Promise((resolve) => {
        if (params?.length) {
          let x = NapicuOS.open_file_in_dir(NapicuOS.get_apps_dir(), params[0]);
          resolve({linesForCMD: [new Line(`RUN : ${x}`)], stateCode: x});
        }
      });
    })
  );
}
