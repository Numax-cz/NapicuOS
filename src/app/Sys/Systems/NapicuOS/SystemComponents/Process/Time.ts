import {SystemProcess} from "../ProcessApp";
import {NapicuProcess} from "../../scripts/Decorators";
import {NapicuOS} from "../../system.napicuos";

@NapicuProcess({
  processTitle: "SystemTime",
  intervalTime: 1000
})
export class SystemProcessTime extends SystemProcess{
  public declare static processName: string
  public declare static processTime: number

  constructor() {
    super(SystemProcessTime.processName, SystemProcessTime.processTime);
  }

  interval = (): void => {
    NapicuOS.update_time();
  }
}
