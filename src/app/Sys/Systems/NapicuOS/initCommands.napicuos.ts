import { Command } from '../../command';
import { ConsoleComponent, Line } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';
import { removeSpace } from './scripts/removeSpaceInString';
import { napicu_os_terminal } from './systemApps.napicuos';
import { of } from 'rxjs';
function unknownOption(param: string): Line {
  return new Line(`Invalid option '${removeSpace(param)}'`, 'white');
}
function helpCommandTemplate(cmd: string, text: string): Line {
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
          napicu_os_terminal().Window.open();
          napicu_os_terminal().Window.open();
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
            case 'systemprocess':
              var process = NapicuOS.get_system_process();
              var exportLines: Line[] = [];
              exportLines.push(new Line('Processes running in the background: ', 'white'));
              process.forEach((value: Process, index: number) => {
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
              resolve([unknownOption(params[0])]);
          }
        } else {
          resolve([
            new Line(`Options:`),
            helpCommandTemplate('systemprocess', 'Returns system processes running in the background'),
            helpCommandTemplate('commands', 'Returns available commands'),
          ]);
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
