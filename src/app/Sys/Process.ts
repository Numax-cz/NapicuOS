import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { SystemComponent } from '../System/system/system.component';

export class Process {
  public title: string = 'NapicuAPP';
  public declare Interval: number;
  public declare component: Type<any>;
  public readonly run = (): void => {};
  public readonly close = (): void => {};
  constructor(component?: Type<any>) {
    if (component) this.component = component;
  }
  public onRun(): void {}

  public onClose(): void {}
}

export function newProcess(p: Process): void {
  GrubComponent.ActiveSystem.SystemProcess.push(p);
}
