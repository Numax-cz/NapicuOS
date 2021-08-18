import { BootComponent } from 'src/app/boot/boot.component';
import { Navigate } from '../BiosRouter';
//TODO Clear interval
export function BiosExit(): void {
  BootComponent.EnterBios = false;
  Navigate('/');
}
