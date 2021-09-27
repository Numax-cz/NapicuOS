import { Type } from '@angular/core';

import { GrubComponent } from '../System/grub/grub.component';
import { SystemComponent } from '../System/system/system.component';
import { NapicuOS } from './Systems/NapicuOS/system.napicuos';

export class System {
  public declare SystemRunning: boolean;
  public declare component: Type<any>;
  public declare boot_time: number;
  public declare boot: {
    title: string;
    logo: string;
  };
  constructor() {
    this.SystemRunning = false;
    this.boot_time = 0;
  }

  public readonly Start = (): void => {
    this.SystemRunning = true;
    SystemComponent.SysComponent = this.component;

    this.onStart();
  };

  public readonly shutDown = (): void => {
    this.SystemRunning = false;
    this.onShutDown();
  };

  /**
   * This function is called after the Start function
   */
  public onStart(): void {}
  /**
   * This function is called after the shutDown function
   */
  public onShutDown(): void {}
}
