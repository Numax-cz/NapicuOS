import {Command} from './SystemComponents/Command';
import {Line} from './Apps/console/console.component';
import {NapicuOS} from './system.napicuos';
import {Process} from './SystemComponents/Process';
import {removeSpace} from './scripts/removeSpaceInString';
import {getHelpCommand, getHelpCommandAPPS,} from './config/commands/help/getCommand';
import {SystemFile} from './SystemComponents/File';
import {CommandStateCodeMetadata} from './interface/Commands/CommandsCodes';
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
import {SystemDirStateData, SystemStateMetadata, SystemUserStateData} from './interface/System';
import {echoHelpCommand} from "./config/commands/help/echoCommand";
import {changeDirectoryHelpCommand, directoryNotFoundError} from "./config/commands/help/changeDirectoryCommand";
import {systemDirAFileMetadata} from './interface/FilesDirs/SystemDir';
import {TerminalClass} from "./SystemComponents/Terminal";
import {ReturnGetDirByPathMetadata} from "./interface/GetDirByPath";
import {SystemFileTypeEnumMetadata} from "./interface/FilesDirs/File";
import {mkdirExists, mkdirHelpCommand} from "./config/commands/help/mkdirCommand";
import {ReplaceSystemVariables} from "./scripts/ReplaceVariables";
import {notePadPathNotExists, notePadUsage} from "./config/commands/help/notePadCommand";
import {PathSpliceLastIndex} from "./scripts/PathSplice";

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
        console.log(NapicuOS.get_home_dir());
        resolve();
      });
    })
  );

  initGetSystemInformation();
  initExitFromConsole();
  initClearTerminal();
  initEcho();
  initMkdir();
  initLs();
  initTouch();
  initPwd();
  initChangeDirectory();
  initSetSystemInformation();
  initKillProcess();
  initCreateUser();
  initLogout();
  initOpenApp();
  initWordPad();
}


function initTouch(): void {
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
  }));
}

function initMkdir(): void {
  NapicuOS.register_command(new Command('Mkdir', SystemCommandsPrefixEnum.mkdirCommand, (params?: string[], terminal?: TerminalClass) => {
    return new Promise((resolve) => {
      if (params?.length) {
        let pth_dir: string | undefined = terminal?.getPath();
        if (!pth_dir) {
          console.error("SYSTEM Terminal dir is undefined");
          return;
        }
        let pth_gt_dir: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(pth_dir);
        if (pth_gt_dir.state === SystemStateMetadata.PathExist && pth_gt_dir.data?.dir) {

          let dir_crt_dir: SystemDirStateData = NapicuOS.creat_dir(pth_gt_dir.data, params[0]);

          if (dir_crt_dir === SystemStateMetadata.DirNotExist) {
            resolve({
              linesForCMD: [],
              stateCode: CommandStateCodeMetadata.success
            })
          } else {
            resolve({
              linesForCMD: [mkdirExists(params[0])],
              stateCode: SystemStateMetadata.DirExist
            })
          }
        } else {
          console.error("SYSTEM Fatal error with dirs system");
          return;
        }
      }
      return resolve({
        linesForCMD: [mkdirHelpCommand],
        stateCode: CommandStateCodeMetadata.HelpCommand,
      })
    });
  }));
}

function initClearTerminal(): void {
  NapicuOS.register_command(
    new Command("Cl", SystemCommandsPrefixEnum.clearCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (terminal) {
          terminal.lines = [];
        }
        return resolve({
          linesForCMD: [mkdirHelpCommand],
          stateCode: CommandStateCodeMetadata.HelpCommand,
        })


      });
    })
  )
}

function initLs(): void {
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

function initWordPad(): void {
  NapicuOS.register_command(
    new Command('Notepad', SystemCommandsPrefixEnum.notePadCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        let pathFile: string | undefined = params?.[0];
        if(pathFile){
          let path: ReturnGetDirByPathMetadata = NapicuOS.get_dir_by_path(ReplaceSystemVariables(PathSpliceLastIndex(pathFile).path));

          if(path.state === SystemStateMetadata.PathExist){
            NapicuOS.open_app("Note", [pathFile]);

          }else {
            return resolve({
              linesForCMD: [notePadPathNotExists(pathFile)],
              stateCode: path.state,
            });
          }
        }else NapicuOS.open_app("Note");

        resolve({
          linesForCMD: [],
          stateCode: CommandStateCodeMetadata.success,
        });
        //TODO Return file not exist
      });
    })
  )
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
    new Command("ChngDir", SystemCommandsPrefixEnum.cdCommand, (params?: string[], terminal?: TerminalClass) => {
      return new Promise((resolve) => {
        if (params?.length) {
          //TODO if terminal 1#
          let path: string = params[0];

          if (path.startsWith("..")) {
            let prth: string[] | undefined = terminal?.getPath().split("/");
            prth?.pop();
            if (!prth) return;
            let prthStr = prth.toString().split(",").join("/");
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

function initSetSystemInformation(): void {
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

function initKillProcess(): void {
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

function initLogout(): void {
  NapicuOS.register_command(
    new Command('UserLogout', SystemCommandsPrefixEnum.logoutCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        NapicuOS.logout_user();
        resolve();
      });
    })
  );
}

function initExitFromConsole(): void {
  NapicuOS.register_command(
    new Command('Exit', SystemCommandsPrefixEnum.exitCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        resolve(NapicuOS.get_system_activated_window_app()?.kill());
      });
    })
  );
}

function initOpenApp(): void {
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
