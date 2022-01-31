import {GrubComponent} from '../System/grub/grub.component';
import {SystemAlert} from './Alert';
import {SystemFile} from './File';
import {System} from './System';
import {window_animations} from './Systems/NapicuOS/config/windowAnimations';
import {SystemFileTypeEnumMetadata} from './Systems/NapicuOS/interface/FilesDirs/file';
import {processConstructor} from './Systems/NapicuOS/interface/process';
import {NapicuOS} from './Systems/NapicuOS/system.napicuos';
import {Window} from './Window';

export declare type ProcessWindowValueMetadata = Window | SystemAlert;

export class Process {
  public processTitle: string = 'NapicuAPP';
  public declare launchedBy: string;
  public declare pid: number;
  public declare Interval: any;
  public declare Window: ProcessWindowValueMetadata;
  private declare readonly file: SystemFile;
  private declare processInterval: { fun: () => void; time: number };

  constructor(data: processConstructor) {
    if (data?.Window) this.Window = data.Window;
    if (data?.processTitle) this.processTitle = data.processTitle;
    if (data?.processInterval) this.processInterval = data.processInterval;
    this.launchedBy = NapicuOS.get_active_user()?.get_username() || 'System';
    this.file = new SystemFile({
      fileName: this.processTitle,
      value: this,
      fileType: SystemFileTypeEnumMetadata.executable,
    });
  }


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
    let x = 0;
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
