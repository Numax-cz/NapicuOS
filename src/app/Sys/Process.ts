import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { Window } from './Window';


export class Process {
  public title: string = 'NapicuAPP';
  public declare Interval: any;

  public declare Window: Window;
  public readonly run = (): void => {};
  public readonly close = (): void => {};
  constructor(data?: { Window?: Window, title?: string  }) {
    if (data?.Window) this.Window = data.Window;
    if (data?.title) this.title = data.title;
  }

  public onRun(): void {}

  public onClose(): void {}
}

