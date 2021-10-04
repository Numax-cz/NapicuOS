import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { setTimeInterval } from 'src/app/Scripts/TimeController';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { SystemComponent } from 'src/app/System/system/system.component';
import { onStartUp, onShutDown, Os } from '../../interface/system';
import { newProcess, Process } from '../../Process';
import { System } from '../../System';
import { welcome } from './Apps/welcome/system.welcome';
import { WelcomeComponent } from './Apps/welcome/welcome/welcome.component';
import { LoadsComponent } from './components/loads/loads.component';
import { NapicuOSComponent } from './components/napicu-os/napicu-os.component';
import { boot_animation_time, boot_time, soft_boot_time } from './config/boot';
import { Window } from '../../Window';
export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;

  public override boot = {
    title: 'NapicuOS',
    logo: 'assets/systems/NapicuOS/logo.webp',
  };

  public override onStart(): void {
    this.SystemBoot();
  }

  public override onShutDown(): void {}

  public SystemBoot(): void {
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

  public override onLoad(): void {
    newProcess(new welcome({ Window: new Window() }));
  }
  //TODO
  // new Window()
}
