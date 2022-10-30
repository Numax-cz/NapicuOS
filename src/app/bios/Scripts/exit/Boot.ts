import {BootComponent} from 'src/app/bios/components/boot/boot.component';
import {BootLoader} from '../bootloader/BootLoader';
import {Loading} from '../LoadingAnimations';
import {BiosComponent} from "../../components/bios/bios.component";

export function Boot(): void {
  BootComponent.EnterBios = false;
  Loading('/blackscreen', 1050, 200);
  var bootLoader = new BootLoader(BiosComponent.BiosMenuSavePoint);
  bootLoader.check();
}
