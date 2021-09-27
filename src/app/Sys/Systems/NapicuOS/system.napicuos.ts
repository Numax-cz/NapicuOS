import { SystemComponent } from 'src/app/System/system/system.component';
import { onStartUp, onShutDown, Os } from '../../interface/system';
import { System } from '../../System';
import { LoadsComponent } from './components/loads/loads.component';
import { NapicuOSComponent } from './components/napicu-os/napicu-os.component';

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;
  public override boot_time = 10; //TODO Config
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
      SystemComponent.SysComponent = this.component
    }, 3000); //TODO Random Number BootTime &  => Config
  }
}
