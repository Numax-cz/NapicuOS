import { exitTimeOut, TimeIn } from 'src/app/Config/Animation/FlashBiosExit';
import { Navigate } from '../BiosRouter';
import { Loading } from '../LoadingAnimations';

export function FlashBiosExit(): void {
  Loading('/bios/main', exitTimeOut, TimeIn);
}


