import { BiosComponent } from 'src/app/bios/bios.component';
import { Navigate } from '../BiosRouter';

export function BiosExit(): void {
  Navigate('/');
}
