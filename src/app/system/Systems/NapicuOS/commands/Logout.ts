import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";

export function initLogout(): void {
  NapicuOS.register_command(
    new Command('UserLogout', SystemCommandsPrefixEnum.logoutCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        NapicuOS.logout_user();
        resolve();
      });
    }, "Logout active user")
  );
}
