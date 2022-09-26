import {BiosSettings} from 'src/app/bios/ToolSettings';
import {BootComponent} from 'src/app/bios/components/boot/boot.component';
import {BootLoader} from '../bootloader/BootLoader';
import {Loading} from '../LoadingAnimations';

export function Boot(): void {
  BootComponent.EnterBios = false;
  Loading('/blackscreen', 1050, 200);
  var bootLoader = new BootLoader(BiosSettings);
  bootLoader.check();
}
