import { copy } from '../Scripts/DeepClone';
import { GrubComponent } from '../System/grub/grub.component';
import { SystemFile } from './File';
import { System } from './System';
import { window_animations } from './Systems/NapicuOS/config/windowAnimations';
import { processConstructor } from './Systems/NapicuOS/interface/process';
import { SystemStateMetadata } from './Systems/NapicuOS/interface/system';
import { NapicuOS } from './Systems/NapicuOS/system.napicuos';
import { Window } from './Window';

export class Process {
  public processTitle: string = 'NapicuAPP';
  public declare launchedBy: string;
  public declare pid: number;
  public declare Interval: any;
  public declare Window: Window;
  private declare file: SystemFile;
  private declare processInterval: { fun: () => void; time: number };

  constructor(data: processConstructor) {
    if (data?.Window) this.Window = data.Window;
    if (data?.processTitle) this.processTitle = data.processTitle;
    if (data?.processInterval) this.processInterval = data.processInterval;
    this.launchedBy = NapicuOS.get_active_user()?.get_username() || 'System';
    this.file = new SystemFile({
      fileName: this.processTitle,
      value: this,
      fileType: 'executable',
    });
  }

  // public install(): this {
  //   if (NapicuOS.get_apps_dir()?.files?.push(this.file) == SystemStateMetadata.FileAlreadyExists) {
  //     //TODO REMOVE
  //     console.error('[DEBUG] Adding a file to the directory was done with an error');
  //   }
  //   return this;
  // }

  public addToDock(): this {
    NapicuOS.add_file_to_dock(this.file);
    return this;
  }

  public run(): this {
    if (this.processInterval) {
      this.Interval = setInterval(() => {
        this.processInterval?.fun();
      }, this.processInterval.time);
    }
    GrubComponent.ActiveSystem.SystemProcess.push(this);
    this.pid = GrubComponent.ActiveSystem.SystemProcess.length - 1;
    return this;
  }
  public runAsSystem(): this {
    this.launchedBy = 'System';
    return this.run();
  }

  public kill(): void {
    var x = 0;
    if (this.Window) {
      this.Window.close();
      x = window_animations * 2;
    }
    setTimeout(() => {
      GrubComponent.ActiveSystem.SystemProcess.splice(this.pid, 1);
    }, x);
  }
  // public onRun(): void {}

  // public onClose(): void {}
}
