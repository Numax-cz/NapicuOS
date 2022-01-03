import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { setTimeInterval } from 'src/app/Scripts/TimeController';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { SystemComponent } from 'src/app/System/system/system.component';
import { onStartUp, onShutDown, Os } from './interface/system';
import { Process } from '../../Process';
import { System } from '../../System';
import { WelcomeComponent } from './Apps/welcome/welcome.component';
import { LoadsComponent } from './components/loads/loads.component';
import { NapicuOSComponent } from './components/napicu-os/napicu-os.component';
import { boot_animation_time, boot_time, soft_boot_time } from './config/boot';
import { Window } from '../../Window';
import { formatDate } from '@angular/common';
import { time_formate } from './config/time';
import { WindowComponent } from './template/window/window.component';
import { elementAt } from 'rxjs';
import { ConsoleComponent } from './Apps/console/console.component';
import { Command } from '../../command';

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;

  public static systemTime: string;
  public override boot = {
    title: 'NapicuOS',
    logo: 'assets/systems/NapicuOS/logo.webp',
  };

  public override onStart(): void {
    this.SystemBoot();
  }

  public override onShutDown(): void {}

  protected setProcess(): void {
    new Process({
      processInterval: {
        fun: () => {
          NapicuOS.systemTime = NapicuOS.getTime();
        },
        time: 1000,
      },
    });

    new Process({
      Window: new Window(WelcomeComponent, 'NapicuOS - Setup'),
      processTitle: 'SetupAPP',
    }).Window.open();

    new Process({
      Window: new Window(ConsoleComponent, 'Terminal'),
      processTitle: 'console',
    }).Window.open();
  }

  public SystemBoot(): void {
    //? This is the main place to load all necessary processes
    this.setProcess();

    SystemComponent.SysComponent = LoadsComponent;
    setTimeout(() => {
      SystemComponent.SysComponent = BlackscreenComponent;
      setTimeout(() => {
        SystemComponent.SysComponent = this.component;
        setTimeout(() => {
          this.load();
        }, boot_animation_time + 100);
      }, soft_boot_time);
    }, boot_time);
  }

  public override onKeyPress(ev: KeyboardEvent) {}

  public override onLoad(): void {}

  public static getTime(): string {
    let now = new Date();
    return formatDate(now, time_formate, 'en-US'); //TODO Settings
  }

  //? * * * Getters * * *
  /**
   * Returns system time
   */
  public static get_system_time(): string {
    return this.systemTime;
  }
  /**
   * Returns whether the system has been started
   */
  public static get_system_boot(): boolean {
    return GrubComponent.ActiveSystem.SystemBooted;
  }
  /**
   * Returns if the system dock is displayed
   */
  public static get_system_bottom_dock_display(): boolean {
    return NapicuOSComponent.BottomDockDisplay;
  }
  /**
   * Returns the system processes
   */
  public static get_system_process(): Process[] {
    return GrubComponent.ActiveSystem.SystemProcess;
  }
  /**
   * Returns applications that can be run in gui mode
   */
  public static get_system_window_apps(): Process[] {
    var process = this.get_system_process();
    var array: Process[] = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i]?.Window) {
        array.push(process[i]);
      }
    }
    return array;
  }
  public static get_system_displayed_window_apps(): Process[] {
    return this.get_system_process().filter((element: Process) => {
      return element.Window?.display == true;
    });
  }

  public static get_system_activated_window_app(): Process {
    return this.get_system_displayed_window_apps().filter((element: Process) => {
      return element.Window?.activated == true;
    })[0];
  }

  public static registerCommand(cmd: Command): void {
    //Command.commands.push()
  }

  // override Interval = setInterval(() => {
  //   NapicuOS.systemTime = NapicuOS.getTime();
  // }, 1000);
}
