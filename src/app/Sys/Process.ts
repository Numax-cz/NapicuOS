import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { Window } from './Window';


export class Process {
  public title: string = 'NapicuAPP';
  public declare Interval: any;

  public declare Window: Window;
  public readonly run = (): void => {};
  public readonly close = (): void => {};
  constructor(data?: { Window?: Window }) {
    if (data?.Window) this.Window = data.Window;
  }

  public onRun(): void {}

  public onClose(): void {}
}

export function newProcess(p: Process): void {
  GrubComponent.ActiveSystem.SystemProcess.push(p);
}
