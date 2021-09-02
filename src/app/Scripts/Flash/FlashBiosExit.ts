import { exitTimeOut } from 'src/app/Config/Animation/FlashBiosExit';
import { Navigate } from '../BiosRouter';
import { Loading } from '../LoadingAnimations';

export function FlashBiosExit(): void {
  Loading('/bios/main', 800, 130);
}


