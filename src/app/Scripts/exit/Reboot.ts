import { BiosSettings } from 'src/app/Array/ToolSettings';
import { BootComponent } from 'src/app/Bios/boot/boot.component';
import { startTimeIn, startTimeOut } from 'src/app/Config/Animation/Boot';
import { Navigate } from '../BiosRouter';
import { BootLoader } from '../bootloader/BootLoader';
import { Loading } from '../LoadingAnimations';
import { Boot } from './Boot';

export function Reboot(): void {
  Loading('/', startTimeOut, startTimeIn);
}
