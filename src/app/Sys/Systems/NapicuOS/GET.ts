import { GrubComponent } from 'src/app/System/grub/grub.component';
import { Process } from '../../Process';
import { NapicuOSComponent } from './components/napicu-os/napicu-os.component';
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
/**
 * Returns the system processes
 */
export function getSystemProcess(): Process[] {
  return GrubComponent.ActiveSystem.SystemProcess;
}
/**
 * Returns if the system dock is displayed
 */
export function getSystemBottomDockDisplay(): boolean {
  return NapicuOSComponent.BottomDockDisplay;
}
/**
 * Returns applications that can be run in gui mode
 */
export function getSystemWindowApps(): Process[] {
  var process = getSystemProcess();
  var array: Process[] = [];
  for (let i = 0; i < process.length; i++) {
    if (process[i]?.Window) {
      array.push(process[i]);
    }
  }
  return array;
}

export function getSystemDisplayedWindowApps(): Process[]{
  return getSystemProcess().filter((element: Process) => {
    return element.Window?.display == true;
  })
}
