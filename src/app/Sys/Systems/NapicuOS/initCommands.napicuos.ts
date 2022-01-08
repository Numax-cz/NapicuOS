import { Command } from '../../Command';
import { NapicuOS } from './system.napicuos';

export function initAllCommands(): void {
  NapicuOS.register_command(
    new Command('Terminal', 'shell', () => {
      return new Promise((resolve, reject) => {
        resolve('Resolve test');
      });
    })
  );
}
