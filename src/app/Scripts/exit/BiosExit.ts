import { BootComponent } from 'src/app/boot/boot.component';
import { Navigate } from '../BiosRouter';
//TODO Clear interval
/**
 * True - Restart system
 * 
 * False - Continues in the system
 * @param {boolean} reset Defines whether the system continues or restarts
 */
export function BiosExit(reset: boolean): void {
  if (reset) {
    BootComponent.BlackScreen = true;
  } else {
    BootComponent.BlackScreen = false;
  }
  BootComponent.EnterBios = false;
  Navigate('/');
}
