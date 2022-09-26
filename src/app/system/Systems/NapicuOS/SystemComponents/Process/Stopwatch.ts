import {NapicuProcess} from "../../scripts/Decorators";
import {SystemProcess} from "../ProcessApp";
import {TimeInterface} from "../../interface/Date";

@NapicuProcess({
  processTitle: "WatchTimer",
  intervalTime: 1000
})
export class SystemProcessStopWatch extends SystemProcess{
  public declare static processName: string;
  public declare static processTime: number;
  protected watch_time_now: number = 0;

  constructor() {
    super(SystemProcessStopWatch.processName, SystemProcessStopWatch.processTime);
  }

  public interval = (): void => {
    this.watch_time_now++;
  }

  public getTime(): TimeInterface<number> {
    let hours = 0, mins = 0, secs = 0, remain =  this.watch_time_now;
    hours = Math.floor(remain / 3600);
    remain -= hours * 3600;
    mins = Math.floor(remain / 60);
    remain -= mins * 60;
    secs = remain;

    return {
      hours: hours,
      minutes: mins,
      seconds: secs
    }
  }

  public resetTime(): void {
    this.watch_time_now = 0;
  }
}
