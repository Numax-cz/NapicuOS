import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { window_animations } from './Systems/NapicuOS/config/windowAnimations';
import { processConstructor } from './Systems/NapicuOS/interface/process';
import { NapicuOS } from './Systems/NapicuOS/system.napicuos';
import { Window } from './Window';

export class Process {
  /**
   * Default icons directory
   */
  public static readonly defaultIconsPath = '/assets/systems/NapicuOS/SystemIcons';
  public processTitle: string = 'NapicuAPP';
  public declare pid: number;
  public declare Interval: any;
  public declare Window: Window;
  public onDock: boolean = false;

  private declare processInterval: { fun: () => void; time: number };

  /**
   * Path to the icon (svg)
   */
  public iconPath: string = `${Process.defaultIconsPath}/XFD/download.svg`;

  public install(): this {
    NapicuOS.get_installed_apps().push(this);
    return this;
  }

  public run(): this {
    if (this.processInterval) {
      this.Interval = setInterval(() => {
        this.processInterval?.fun();
      }, this.processInterval.time);
    }
    GrubComponent.ActiveSystem.SystemProcess.push(this);
    this.pid = GrubComponent.ActiveSystem.SystemProcess.length - 1;
    if (this.onDock) NapicuOS.get_apps_in_dock().push(this);

    return this;
  }

  public kill(): void {
    var x = 0;
    if (this.Window) {
      this.Window.close();
      x = window_animations * 2;
    }
    setTimeout(() => {
      GrubComponent.ActiveSystem.SystemProcess.splice(this.pid, 1);
    }, x);
  }

  constructor(data: processConstructor) {
    if (data?.Window) this.Window = data.Window;
    if (data?.processTitle) this.processTitle = data.processTitle;
    if (data?.processInterval) this.processInterval = data.processInterval;
    if (data?.onDock) this.onDock = true;
    if (data?.iconPath) this.iconPath = data.iconPath;
  }

  // public onRun(): void {}

  // public onClose(): void {}
}
