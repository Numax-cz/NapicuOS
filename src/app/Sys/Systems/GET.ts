import { GrubComponent } from 'src/app/System/grub/grub.component';
import { NapicuOS } from './NapicuOS/system.napicuos';
/**
 * Returns system time
 */
export function getSystemTime(): string {
  return NapicuOS.systemTime;
}

/**
 * Returns whether the system has been started
 */
export function SystemBoot(): boolean {
  return GrubComponent.ActiveSystem.SystemBooted;
}
