import { BiosSettings } from 'src/app/Array/ToolSettings';
import { BootComponent } from 'src/app/Bios/boot/boot.component';
import { Navigate } from '../BiosRouter';
import { BootLoader } from '../bootloader/BootLoader';
import { Loading } from '../LoadingAnimations';

export function Boot(): void {
  BootComponent.EnterBios = false;
  setTimeout(() => {
    Loading('/blackscreen', 200, 550);
    var bootLoader = new BootLoader(BiosSettings);
    bootLoader.check();
  }, 550);
}
