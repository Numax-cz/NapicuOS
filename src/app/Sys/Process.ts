import {GrubComponent} from '../System/grub/grub.component';
import {SystemAlert} from './Alert';
import {SystemFile} from './File';
import {System} from './System';
import {window_animations} from './Systems/NapicuOS/config/windowAnimations';
import {processConstructor} from './Systems/NapicuOS/interface/process';
import {NapicuOS} from './Systems/NapicuOS/system.napicuos';
import {Window} from './Window';

export declare type ProcessWindowValueMetadata = Window | SystemAlert;

export class Process {
  private declare processInterval: { fun: () => void; time: number };

  constructor(data: processConstructor) {
    if (data?.Window) this._Window = data.Window;
    if (data?.processTitle) this._processTitle = data.processTitle;
    if (data?.processInterval) this.processInterval = data.processInterval;
    this._launchedBy = NapicuOS.get_active_user()?.username || 'System';
  }

  private _processTitle: string = 'NapicuAPP';

  get processTitle(): string {
    return this._processTitle;
  }

  private declare _launchedBy: string;

  get launchedBy(): string {
    return this._launchedBy;
  }

  private declare _pid: number;

  get pid(): number {
    return this._pid;
  }

  private declare _Interval: any;

  get Interval(): any {
    return this._Interval;
  }

  private declare _Window: ProcessWindowValueMetadata;

  get Window(): ProcessWindowValueMetadata {
    return this._Window;
  }

  get installer_file(): SystemFile | null {
    let file = NapicuOS.get_file_by_file_title(NapicuOS.get_apps_dir(), this.processTitle)
    if (typeof file === 'object') {
      return file
    }
    return null;
  }

  public run(): this {
    if (this.processInterval) {
      this._Interval = setInterval(() => {
        this.processInterval?.fun();
      }, this.processInterval.time);
    }
    GrubComponent.ActiveSystem.SystemProcess.push(this);
    this._pid = GrubComponent.ActiveSystem.SystemProcess.length - 1;
    NapicuOS.onRunNewProcess();
    return this;
  }

  public runAsSystem(): this {
    this._launchedBy = 'System';
    return this.run();
  }

  public kill(): void {
    let x = 0;
    if (this._Window) {
      this._Window.close();
      x = window_animations * 2;
    }
    setTimeout(() => {
      GrubComponent.ActiveSystem.SystemProcess.splice(this._pid, 1);
    }, x);
  }

  // public onRun(): void {}

  // public onClose(): void {}
}
