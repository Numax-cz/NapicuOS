import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { SystemComponent } from '../System/system/system.component';
interface data {
  posX: number;
  posY: number;
  width: number;
  height: number;
}
export class Process {
  public title: string = 'NapicuAPP';
  public declare Interval: number;
  public appData: data = {
    posX: 30,
    posY: 30,
    width: 700,
    height: 400,
  };
  public declare component: Type<any>;
  public readonly run = (): void => {};
  public readonly close = (): void => {};
  constructor() {
    //this.Interval = i.Interval
  }
  public onRun(): void {}

  public onClose(): void {}
}

export function newProcess(p: Process): void {
  GrubComponent.ActiveSystem.SystemProcess.push(p);
}
