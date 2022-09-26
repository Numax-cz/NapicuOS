import {Type} from '@angular/core';
import {SystemComponent} from '../../../../grub/system/system.component';
import {Process} from './Process';
import {NapicuOSComponent} from '../components/napicu-os/napicu-os.component';
import {BlackscreenComponent} from "../../../../bios/components/blackscreen/blackscreen.component";
import {Navigate} from "../../../../bios/Scripts/BiosRouter";

export class System {
  public declare SystemBooted: boolean;
  public declare SystemProcess: Process[];
  public declare SystemRunning: boolean;
  public declare component: Type<any>;
  public declare boot: {
    title: string;
    logo: string;
  };

  constructor() {
    this.SystemBooted = false;
    this.SystemRunning = false;
    this.SystemProcess = [];
    SystemComponent.SystemComponent = NapicuOSComponent; //! TODO
  }

  public readonly Start = (): void => {
    SystemComponent.SystemComponent = this.component;
    this.onStart();
    this.SystemRunning = true;
  };

  public readonly shutDown = (): void => {
    SystemComponent.SystemComponent = BlackscreenComponent;
    this.onShutDown();
    this.SystemRunning = false;
  };

  public readonly reboot = (): void => {
    this.shutDown();
    setTimeout(() => {
      Navigate("/");
    }, 2000);
  }

  public readonly load = (): void => {
    this.SystemBooted = true;
    window.addEventListener('keydown', (ev: KeyboardEvent) =>
      this.onKeyPress(ev)
    );
    this.onLoad();
  };

  public onKeyPress(ev: KeyboardEvent): void {
  }

  /**
   * This function is called after the Start function
   */
  public onStart(): void {
  }

  /**
   * This function is called after the shutDown function
   */
  public onShutDown(): void {
  }

  public onLoad(): void {
  }

  /**
   * This function is called after the user logs in
   */
  public onLogin(): void {
  }
}
