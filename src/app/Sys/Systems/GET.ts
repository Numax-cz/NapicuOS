import { GrubComponent } from 'src/app/System/grub/grub.component';
import { NapicuOS } from './NapicuOS/system.napicuos';

export function getSystemTime(): string {
  //TODO string/number
  return NapicuOS.systemTime;
}

export function SystemBoot(): boolean {
  return GrubComponent.ActiveSystem.SystemBooted;
}
