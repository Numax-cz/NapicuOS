import {exitTimeOut, TimeIn} from 'src/app/bios/config/Animation/FlashBiosExit';
import {Loading} from '../LoadingAnimations';

export function FlashBiosExit(): void {
  Loading('/bios/main', exitTimeOut, TimeIn);
}
