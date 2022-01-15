import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { processConstructor } from './Systems/NapicuOS/interface/process';
import { NapicuOS } from './Systems/NapicuOS/system.napicuos';
import { Window } from './Window';

export class Process {
  public processTitle: string = 'NapicuAPP';
  public declare pid: number;
  public declare Interval: any;

  public declare Window: Window;
  public run = (): void => {};

  public kill = (): void => {
    // console.log(NapicuOS.get_system_process()[this.pid]);

    // if (this.Window) this.Window.close();
    // delete NapicuOS.get_system_process()[this.pid];
    // console.log(NapicuOS.get_system_process()[this.pid]);
  };

  constructor(data: processConstructor) {
    if (data?.Window) this.Window = data.Window;
    if (data?.processTitle) this.processTitle = data.processTitle;
    if (data?.processInterval) {
      this.Interval = setInterval(() => {
        data.processInterval?.fun();
      }, data.processInterval.time);
    }

    GrubComponent.ActiveSystem.SystemProcess.push(this);
    this.pid = GrubComponent.ActiveSystem.SystemProcess.length - 1;
  }

  public onRun(): void {}

  public onClose(): void {}
}
