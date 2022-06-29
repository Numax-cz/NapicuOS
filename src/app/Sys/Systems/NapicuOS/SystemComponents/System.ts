import {Type} from '@angular/core';
import {SystemComponent} from '../../../../Grub/system/system.component';
import {Process} from './Process';
import {NapicuOSComponent} from '../components/napicu-os/napicu-os.component';
import {BlackscreenComponent} from "../../../../Bios/components/blackscreen/blackscreen.component";

export class System {
  //TODO Doc
  public declare SystemBooted: boolean;
  public declare SystemProcess: Process[];
  public declare component: Type<any>;
  public declare boot: {
    title: string;
    logo: string;
  };

  constructor() {
    this.SystemBooted = false;
    this.SystemProcess = [];
    SystemComponent.SystemComponent = NapicuOSComponent; //! TODO
  }

  public readonly Start = (): void => {
    SystemComponent.SystemComponent = this.component;
    this.onStart();
  };

  public readonly shutDown = (): void => {
    SystemComponent.SystemComponent = BlackscreenComponent;
    this.onShutDown();
  };

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
