import { Command } from '../../Command';
import { ConsoleComponent } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';
import { Process } from '../../Process';

export function initAllCommands(): void {
  //? This is test for debugging
  NapicuOS.register_command(
    new Command('Terminal', 'shell', () => {
      return new Promise((resolve, reject) => {
        resolve('Resolve test');
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
        if (params) {
          if (params[0] === 'systemprocess') {
            var p = NapicuOS.get_system_process();

            resolve('Done');
          }
        }
      });
    })
  );
}

