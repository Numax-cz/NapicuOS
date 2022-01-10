import { Command } from '../../Command';
import { ConsoleComponent, Line } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';
import { removeSpace } from './scripts/removeSpaceInString';

function unknownOption(param: string): Line {
  return new Line(`Invalid option '${removeSpace(param)}'`, 'white');
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', 'shell', () => {
      return [
        new Line('HELLO WORLD', 'white'),
        new Line('HELLO WORLD', 'white'),
        new Line('HELLO WORLD', 'white'),
      ];
    })
  );

  initClearConsole();
  initGetSystemInformation();
}

function initClearConsole(): void {
  NapicuOS.register_command(
    new Command('ClearConsole', 'clear', () => {
      ConsoleComponent.delete_all_history();
    })
  );
}

function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemGetter', 'get', (params) => {
      if (params) {
        switch (params[0]) {
          case 'systemprocess':
            var process = NapicuOS.get_system_process();
            var i: string[] = process.map((value: Process, index: number) => {
              return `${index} | ${value.processTitle} `;
            });
            return i.forEach((value: string) => {
              return new Line(value, 'white');
            });
          case 'commands':
            var commands = NapicuOS.get_available_commands();
            var i: string[] = commands.map((value: Command, index: number) => {
              return `${index} | ${value.commandName} : ${value.command} `;
            });
            return i.forEach((value: string) => {
              return new Line(value, 'white');
            });

          default:
            return [unknownOption(params[0])];
        }
      }
      return;
    })
  );
}
