import { startTimeIn, startTimeOut } from 'src/app/Config/Animation/Boot';
import { Loading } from '../LoadingAnimations';

export function Reboot(): void {
  Loading('/', startTimeOut, startTimeIn);
}
