import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";

export function initExitFromConsole(): void {
  NapicuOS.register_command(
    new Command('Exit', SystemCommandsPrefixEnum.exitCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        resolve(NapicuOS.get_system_activated_window_app()?.kill());
      });
    })
  );
}
