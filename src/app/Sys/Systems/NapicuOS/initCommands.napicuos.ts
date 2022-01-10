import { Command } from '../../Command';
import { ConsoleComponent, Lines } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';
import { removeSpace } from './scripts/removeSpaceInString';

function unknownOption(param: string): Lines {
  return new Lines([`Invalid option '${removeSpace(param)}'`], 'white');
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', 'shell', () => {
      return new Lines(['red', 'red', 'red', 'red'], 'white');
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
            var p = NapicuOS.get_system_process();
            var i: string[] = p.map((value: Process, index: number) => {
              return `${index} | ${value.processTitle} `;
            });
            return new Lines(i, 'white');
          default:
            return unknownOption(params[0]);
        }
      }
      return;
    })
  );
}
