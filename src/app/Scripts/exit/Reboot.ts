import { BootComponent } from 'src/app/boot/boot.component';
import { Navigate } from '../BiosRouter';

export function Reboot(): void {
  BootComponent.BlackScreen = true;
  redirect();
}

export function Continue(): void {
  BootComponent.BlackScreen = false;
  redirect();
}
function redirect(): void {
  BootComponent.EnterBios = false;
  Navigate('/');
}
