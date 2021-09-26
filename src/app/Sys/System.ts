import { Type } from "@angular/core";
import { SystemComponent } from "../System/system/system.component";

export class System {
  public SystemRunning: boolean;
  public declare component: Type<any>;
  public static Title: string;
  declare boot: {
    title: string;
    logo: string;
  };
  constructor() {
    this.SystemRunning = false;
  }

  public Start(): void {
    this.SystemRunning = true;
    SystemComponent.SysComponent = this.component;
  }
  public shutDown(): void {
    this.SystemRunning = false;
  }

  protected onStartup(): void {}

  protected onShutDown(): void {}
}
