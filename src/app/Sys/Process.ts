import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { Window } from './Window';

interface Inter {
  loop: string[];
}
export class Process {
  public title: string = 'NapicuAPP';
  public declare Interval: any;
  public declare display: boolean;
  public declare Window: Window;
  public declare component: Type<any>;
  public readonly run = (): void => {};
  public readonly close = (): void => {};
  constructor(data?: { Window?: Window }) {
    if (data?.Window) this.Window = data.Window;
  }

  public readonly open = (): void => {
    this.display = true;
  };

  public onRun(): void {}

  public onClose(): void {}
}

export function newProcess(p: Process): void {
  GrubComponent.ActiveSystem.SystemProcess.push(p);
}
