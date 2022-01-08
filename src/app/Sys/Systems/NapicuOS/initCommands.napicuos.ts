import { Command } from '../../Command';
import { ConsoleComponent } from './Apps/console/console.component';
import { NapicuOS } from './system.napicuos';

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
