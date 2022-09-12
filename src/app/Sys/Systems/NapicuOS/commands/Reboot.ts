import {NapicuOS} from "../system.napicuos";
import {Command} from "../SystemComponents/Command";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";
import {Line} from "../Apps/console/console.component";
import {NapicuDate} from "napicuformatter";
import {GrubComponent} from "../../../../Grub/grub/grub.component";
import {SystemProcessRebootTimeout} from "../SystemComponents/Process/RebootTimeout";

export function initReboot(): void {
  NapicuOS.register_command(
    new Command('Reboot', SystemCommandsPrefixEnum.rebootCommand, (params: string[] | undefined) => {
      return new Promise((resolve) => {
        let time: number = (params?.length)? Number(params[0]) :  0;

        new SystemProcessRebootTimeout(5000).process.run();

      });
    }, "Reboot system")
  );
}
