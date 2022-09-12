import {SystemProcess} from "../ProcessApp";
import {GrubComponent} from "../../../../../Grub/grub/grub.component";

export class SystemProcessRebootTimeout extends SystemProcess{
  public static processName: string = "RebootTimeout";

  constructor(timeOut: number) {
    super(SystemProcessRebootTimeout.processName, timeOut);
  }

  interval = (): any => {
    GrubComponent.GrubActiveSystem.reboot();
    this.process.kill();
  }
}
