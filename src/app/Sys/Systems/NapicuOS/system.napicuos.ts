import { onStartUp, onShutDown, Os } from '../../interface/system';
import { System } from '../../System';
import { NapicuOSComponent } from './napicu-os/napicu-os.component';

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;

  public override boot = {
    title: 'NapicuOS',
    logo: 'assets/icons/icon-384x384.png',
  };

  public override onStart(): void {}

  public override onShutDown(): void {}
}
