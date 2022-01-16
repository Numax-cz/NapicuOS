import { Command } from '../../command';
import { Line } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';
import { removeSpace } from './scripts/removeSpaceInString';

import { getHelpCommand, getHelpCommandAPPS } from './config/commands/help/getCommand';
function unknownOption(param: string): Line {
  return new Line(`Invalid option '${removeSpace(param)}'`, 'white');
}
export function helpCommandTemplate(cmd: string, text: string): Line {
  return new Line(`\t${cmd} - ${text}`);
}
function usageCommand(cmd: string): Line {
  return new Line(`usage: ${cmd}`);
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', 'shell', (params, activatedWindow) => {
      return new Promise((resolve) => {
        activatedWindow?.kill();
        setTimeout(() => {
          resolve([
            new Line('HELLO WORLD', 'white'),
            new Line('HELLO WORLD', 'white'),
            new Line('HELLO WORLD', 'white'),
          ]);
        }, 1000);
      });
    })
  );

  initGetSystemInformation();
  initExitFromConsole();
  initSetSystemInformation();
  // initOpenCommand();
  initKillProcess();
}

function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemGetter', 'get', (params) => {
      return new Promise((resolve) => {
        if (params?.length) {
          switch (params[0]) {
            case '--help':
              resolve([getHelpCommand]);
              break;
            case 'systemprocess':
              var process = NapicuOS.get_system_process();
              var exportLines: Line[] = [];
              exportLines.push(new Line('Processes running in the background: ', 'white'));
              process.forEach((value: Process, index: number) => {
                exportLines.push(new Line(`${index} | ${value.processTitle}`, 'white'));
              });
              return resolve(exportLines);
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
                    resolve([unknownOption(params[1]), getHelpCommandAPPS]);
                    break;
                }
              } else {
                exportLines.push(new Line('GUI applications running in the background: ', 'white'));
              }

              apps.forEach((value: Process, index: number) => {
                exportLines.push(new Line(`${index} | ${value.processTitle}`, 'white'));
              });
              return resolve(exportLines);
            case 'commands':
              var commands = NapicuOS.get_available_commands();
              var exportLines: Line[] = [];
              commands.forEach((value: Command, index: number) => {
                exportLines.push(new Line(`${index} | ${value.commandName} : ${value.command} `, 'white'));
              });
              return resolve(exportLines);

            default:
              resolve([unknownOption(params[0]), getHelpCommand]);
          }
        } else {
          resolve([getHelpCommand]);
        }
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
            case 'processtitle':
              return resolve(activatedWindow?.Window.setWindowTitle(params[1]));

            default:
              resolve([unknownOption(params[0])]);
          }
        } else {
          resolve([new Line(`Options:`), helpCommandTemplate('processtitle', 'Sets the terminal name')]);
        }
      });
    })
  );
}

function initKillProcess(): void {
  NapicuOS.register_command(
    new Command('SystemProcessKiller', 'kill', (params) => {
      return new Promise((resolve) => {
        if (params?.length) {
          if (params[0]) {
            var x = NapicuOS.get_system_process_by_title(params[0]);
            if (x) resolve(x.kill());
            resolve([new Line(`Process '${params[0]}' not found`)]);
          }
        } else {
          resolve([usageCommand(`kill <process_name>`)]);
        }
      });
    })
  );
}

// function initOpenCommand(): void {
//   NapicuOS.register_command(
//     new Command('SystemOpen', 'open', (params) => {
//       return new Promise((resolve) => {
//         if (params?.length) {
//           if (params[0]) {
//             resolve(
//               NapicuOS.get_system_window_apps().forEach((element: Process) => {
//                 console.log(element);

//                 if (element.processTitle.toLocaleLowerCase() === params[0].toLocaleLowerCase()) {
//                   element.Window.open();
//                   return;
//                 }
//               })
//             );
//           } else {
//           }
//         } else {
//           resolve([
//             new Line(`Options:`),
//             helpCommandTemplate('systemprocess', 'Returns system processes running in the background'),
//             helpCommandTemplate('commands', 'Returns available commands'),
//           ]);
//         }
//       });
//     })
//   );
// }

function initExitFromConsole(): void {
  NapicuOS.register_command(
    new Command('Exit', 'exit', (params, activatedWindow) => {
      return new Promise((resolve) => {
        resolve(activatedWindow?.kill());
      });
    })
  );
}
