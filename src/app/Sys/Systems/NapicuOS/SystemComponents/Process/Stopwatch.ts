import {NapicuProcess} from "../../scripts/Decorators";
import {SystemProcess} from "../ProcessApp";
import {NapicuOS} from "../../system.napicuos";

@NapicuProcess({
  processTitle: "watch",
  intervalTime: 1000
})
export class SystemProcessStopWatch extends SystemProcess{
  public declare static processName: string;
  public declare static processTime: number;
  public watch_time: number = 0;

  constructor() {
    super(SystemProcessStopWatch.processName, SystemProcessStopWatch.processTime);
  }

  public interval = (): void => {
    console.log(this.watch_time)
  }
}
