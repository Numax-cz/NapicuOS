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
      interval: {
        fun: () => {
          NapicuOS.systemTime = NapicuOS.getTime();
        },
        time: 1000,
      },
    });

    new Process({ Window: new Window(WelcomeComponent), title: 'Welcome' }).Window.open();
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

  // override Interval = setInterval(() => {
  //   NapicuOS.systemTime = NapicuOS.getTime();
  // }, 1000);
}
