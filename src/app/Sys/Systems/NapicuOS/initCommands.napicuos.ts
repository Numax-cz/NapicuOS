import { Command } from '../../command';
import { ConsoleComponent, Line } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';
import { removeSpace } from './scripts/removeSpaceInString';
import { napicu_os_terminal } from './systemApps.napicuos';
function unknownOption(param: string): Line {
  return new Line(`Invalid option '${removeSpace(param)}'`, 'white');
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

  //initClearConsole();
  initGetSystemInformation();
  initExitFromConsole();
}

// function initClearConsole(): void {
//   NapicuOS.register_command(
//     new Command('ClearConsole', 'clear', () => {
//       return new Promise((resolve) => {
//         resolve(ConsoleComponent.delete_all_history());
//       });
//     })
//   );
// }

function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemGetter', 'get', (params) => {
      return new Promise((resolve) => {
        if (params) {
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
        }
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
