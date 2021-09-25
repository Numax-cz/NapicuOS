import { System } from '../../System';
import { NapicuOSComponent } from './napicu-os/napicu-os.component';

export class NapicuOS extends System {
  public component = NapicuOS;
  public boot = {
    title: 'NapicuOS',
    logo: 'assets/icons/icon-384x384.png',
  };
}
