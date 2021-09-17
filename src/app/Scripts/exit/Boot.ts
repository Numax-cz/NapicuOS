import { BiosSettings } from 'src/app/Array/ToolSettings';
import { BootComponent } from 'src/app/Bios/boot/boot.component';
import { Navigate } from '../BiosRouter';
import { BootLoader } from '../bootloader/BootLoader';
import { Loading } from '../LoadingAnimations';

export function Boot(): void {
  BootComponent.EnterBios = false;
  Loading('/blackscreen', 1050, 200);
  var bootLoader = new BootLoader(BiosSettings);
  bootLoader.check();
}
