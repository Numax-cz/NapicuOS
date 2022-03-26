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
  /**
   * Determines who started the process
   */
  private declare _launchedBy: string;
  /**
   * Process interval
   */
  private declare _Interval: any;
  /**
   * Process identification
   */
  private declare _pid: number;
  /**
   * Specifies whether the process can be run multiple times
   */
  private declare _multiRun: boolean;
  /**
   * Process name
   */
  private declare readonly _processTitle: string;
  /**
   * Specifies the GUI of the process
   */
  private declare readonly _Window: ProcessWindowValueMetadata;
  /**
   * Process interval - Function
   */
  private declare readonly processInterval: { fun: () => void; time: number };


  constructor(data: processConstructor) {
    if (data?.Window) this._Window = data.Window;
    if (data?.processTitle) this._processTitle = data.processTitle;
    if (data?.processInterval) this.processInterval = data.processInterval;
    this._processTitle = data.processTitle || "NapicuAPP";
    this._multiRun = data.multiRun || true;
    this._launchedBy = NapicuOS.get_active_user()?.username || 'System';
  }


  /**
   * Returns the process name
   */
  get processTitle(): string {
    return this._processTitle;
  }

  /**
   * Returns the name of the user who run the process
   */
  get launchedBy(): string {
    return this._launchedBy;
  }


  /**
   * Returns the process identification
   */
  get pid(): number {
    return this._pid;
  }


  /**
   * Returns the process interval
   */
  get Interval(): any {
    return this._Interval;
  }


  /**
   * Returns the process application window
   */
  get Window(): ProcessWindowValueMetadata {
    return this._Window;
  }

  /**
   * Installs the application
   */
  get installer_file(): SystemFile | null {
    let file = NapicuOS.get_file_by_file_title(NapicuOS.get_apps_dir(), this.processTitle)
    if (typeof file === 'object') {
      return file
    }
    return null;
  }

  /**
   * Run the process
   */
  public run(): this {
    if (!this._multiRun && !NapicuOS.get_user_process_by_title(this._processTitle)) return this;
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

  /**
   * Run the process as root
   */
  public runAsSystem(): this {
    this._launchedBy = 'System';
    return this.run();
  }

  /**
   * Terminates the process
   */
  public kill(): void {
    let x = 0;
    if (this._Window) {
      this._Window.close();
      x = window_animations * 2;
    }
    if (this._Interval) clearInterval(this._Interval);
    setTimeout(() => {
      GrubComponent.ActiveSystem.SystemProcess.splice(this._pid, 1);
      NapicuOS.onKillProcess();
    }, x);
  }
}
