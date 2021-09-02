import { FlashComponent } from 'src/app/Bios/flash/flash.component';
import { Navigate } from '../BiosRouter';
export function FlashBios(): void {
  FlashComponent.ezFlashWindow = true;
  Navigate('flash');
}
