import { Type } from '@angular/core';
import { system_enter } from '../Config/BootLoader';
import { MoveWindowOptions } from '../Scripts/MoveWindowOptions';

import { GrubComponent } from '../System/grub/grub.component';
import { SystemComponent } from '../System/system/system.component';
import { NapicuOSComponent } from './Systems/NapicuOS/components/napicu-os/napicu-os.component';
import { NapicuOS } from './Systems/NapicuOS/system.napicuos';

export class System {
  //TODO Doc
  public declare SystemRunning: boolean;

  public declare SystemBooted: boolean;

  public declare component: Type<any>;
  public declare boot: {
    title: string;
    logo: string;
  };
  constructor() {
    this.SystemRunning = false;
    this.SystemBooted = false;
    SystemComponent.SysComponent = NapicuOSComponent; //! TODO
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

  public readonly load = (): void => {
    this.SystemBooted = true;
    window.addEventListener('keydown', (ev: KeyboardEvent) => this.onKeyPress(ev));
    this.onLoad();
  };

  public onKeyPress(ev: KeyboardEvent): void {}

  /**
   * This function is called after the Start function
   */
  public onStart(): void {}
  /**
   * This function is called after the shutDown function
   */
  public onShutDown(): void {}

  public onLoad(): void {}
}
