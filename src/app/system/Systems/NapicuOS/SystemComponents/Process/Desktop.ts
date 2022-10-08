import {SystemProcess} from "../ProcessApp";
import {GrubComponent} from "../../../../../grub/grub/grub.component";
import {NapicuOS} from "../../system.napicuos";
import {NapicuProcess} from "../../scripts/Decorators";


@NapicuProcess({
  processTitle: "NapicuDesktop",
  intervalTime: 100000
})
export class SystemProcessDesktop extends SystemProcess{
  public declare static processName: string;
  public declare static processTime: number;

  constructor() {
    super(SystemProcessDesktop.processName, SystemProcessDesktop.processTime);

    this.process.onProcessKill = () => {
      NapicuOS.kill_desktop();
    }
  }

  interval = (): any => {

  }
}
