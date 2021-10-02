import { GrubComponent } from "../System/grub/grub.component";
import { SystemComponent } from "../System/system/system.component";

export class Process {
  public title: string = 'NapicuAPP';
  public readonly Run = (): void => {};
  public readonly Close = (): void => {};
    constructor() {
        
    }
  public onRun(): void {}

  public onClose(): void {}
}

export function newProcess(p: Process): void {
    GrubComponent.ActiveSystem.SystemProcess.push([p]);
}