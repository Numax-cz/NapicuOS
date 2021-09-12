import { BootComponent } from 'src/app/Bios/boot/boot.component';
import { startTimeIn, startTimeOut } from 'src/app/Config/Animation/Boot';
import { Navigate } from '../BiosRouter';
import { Loading } from '../LoadingAnimations';

export function Reboot(): void {
  Loading('/', startTimeOut, startTimeIn);
}

export function Continue(): void {
  BootComponent.EnterBios = false;
  Navigate('/blackscreen'); //! BootLoader
}
