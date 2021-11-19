import { GrubComponent } from 'src/app/System/grub/grub.component';
import { Process } from '../../Process';
import { NapicuOS } from './system.napicuos';
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

export function getSystemProcess(): Process[]{
  return GrubComponent.ActiveSystem.SystemProcess;
}

// export function getSystemBottomMenu(): number{

// } 