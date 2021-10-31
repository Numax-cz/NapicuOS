import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { Window } from './Window';

export class Process {
  public title: string = 'NapicuAPP';
  public declare Interval: any;

  public declare Window: Window;
  public readonly run = (): void => {};
  public readonly kill = (): void => {};
  constructor(data?: { title?: string; interval?: { fun: () => void; time: number }; Window?: Window }) {
    if (data?.Window) this.Window = data.Window;
    if (data?.title) this.title = data.title;
    if (data?.interval) {
      this.Interval = setInterval(() => {
        data.interval?.fun();
      }, data.interval.time);
    }

    GrubComponent.ActiveSystem.SystemProcess.push(this);
    var PID = GrubComponent.ActiveSystem.SystemProcess.length - 1;
    console.log(PID);
  }

  public onRun(): void {}

  public onClose(): void {}
}
