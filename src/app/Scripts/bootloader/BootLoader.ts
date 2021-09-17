import { drive } from 'src/app/Array/Drives';
import { BiosOptionsST, BiosSettings } from 'src/app/Array/ToolSettings';
import { NoBootDevice } from 'src/app/Config/BlackScreenTexts';
import { Navigate } from '../BiosRouter';
import { setTime } from '../TimeDate';
import { animationCursor, setDisplayText } from './text';
/**
 * Checks the disk to see if there is something to boot from
 */
export function BootLoaderTEST(): void {
  //   Navigate('/blackscreen');
  //   var selected: number = BiosSettings.Boot.settings.boot_priority.selected;
  //   let test = new animationCursor();
  //   test.blinking();
  //   setTimeout(() => {
  //     if (checkBootSector(selected)) {
  //     }
  //   }, 1350);
}

// function checkBootSector(selected: number): boolean {
//   if (drive && drive.length && drive[selected].data) {
//     if (!drive[selected].data.boot) {
//       setDisplayText(NoBootDevice);
//       return false;
//     }
//     return true;
//   } else {
//     //TODO No drives found
//     return false;
//   }
// }

export class BootLoader {
  protected selectedBootPriority: number;
  protected biosConfig: BiosOptionsST;

  constructor(biosConfig: BiosOptionsST) {
    this.biosConfig = biosConfig;
    this.selectedBootPriority = this.biosConfig.Boot.settings.boot_priority.selected;
  }

  public check(): void {
    let test = new animationCursor();
    test.blinking();

    setTimeout(() => {
      if (this.checkBootSector()) {
      }
    }, 1350);
  }

  protected checkBootSector(): boolean {
    if (drive && drive.length && drive[this.selectedBootPriority].data) {
      if (!drive[this.selectedBootPriority].data.boot) {
        setDisplayText(NoBootDevice);
        return false;
      }
      return true;
    } else {
      //TODO No drives found
      return false;
    }
  }
}
