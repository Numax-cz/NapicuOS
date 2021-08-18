import { BiosComponent } from 'src/app/bios/bios.component';
import { BootComponent } from 'src/app/boot/boot.component';
import { Navigate } from '../BiosRouter';

export function BiosExit(): void {
  BootComponent.EnterBios = false;
  Navigate('/');
}
