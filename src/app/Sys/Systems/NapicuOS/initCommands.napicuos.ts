import { Command } from '../../Command';
import { ConsoleComponent, Lines } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';

function unknownOption(param: string): Lines{
  return new Lines([`Invalid option '${param}'`], 'white');
}

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', 'shell', () => {
      return new Promise((resolve, reject) => {
        resolve(new Lines(['red', 'red', 'red', 'red'], 'white'));
      });
    })
  );

  initClearConsole();
  initGetSystemInformation();
}

function initClearConsole(): void {
  NapicuOS.register_command(
    new Command('ClearConsole', 'clear', () => {
      return new Promise((resolve, reject) => {
        ConsoleComponent.delete_all_history();
        resolve();
      });
    })
  );
}

function initGetSystemInformation(): void {
  NapicuOS.register_command(
    new Command('SystemGetter', 'get', (params) => {
      return new Promise((resolve, reject) => {
        //TODO Params System
        //TODO Remove Space in params system
        // if (params) {
        //   if (params[0] === 'systemprocess') {
        //     var p = NapicuOS.get_system_process();
        //     var i: string[] = p.map((value: Process, index: number) => {
        //       return  `${index} | ${value.processTitle} `;
        //     });
        //     resolve(new Lines(i, 'white'));
        //   } else {
        //     resolve(unknownOption(params[0]));
        //   }
        // }
        
      });
    })
  );
}
