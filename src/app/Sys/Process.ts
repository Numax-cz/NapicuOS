import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { processConstructor } from './Systems/NapicuOS/interface/process';
import { Window } from './Window';

export class Process {
  public processTitle: string = 'NapicuAPP';
  public declare Interval: any;

  public declare Window: Window;
  public readonly run = (): void => {};
  public readonly kill = (): void => {};
  constructor(data: processConstructor) {
    if (data?.Window) this.Window = data.Window;
    if (data?.processTitle) this.processTitle = data.processTitle;
    if (data?.processInterval) {
      this.Interval = setInterval(() => {
        data.processInterval?.fun();
      }, data.processInterval.time);
    }

    GrubComponent.ActiveSystem.SystemProcess.push(this);
  }

  public onRun(): void {}

  public onClose(): void {}
}
