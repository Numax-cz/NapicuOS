import { drive } from 'src/app/Array/Drives';
import { BiosOptionsST, BiosSettings } from 'src/app/Array/ToolSettings';
import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { NoBootDevice } from 'src/app/Config/BlackScreenTexts';
import { Navigate } from '../BiosRouter';
import { setTime } from '../TimeDate';
import { animationCursor, setDisplayText } from './text';

/**
 * Main part of the system bootloader
 */
export class BootLoader {
  protected selectedBootPriority: number;
  protected biosConfig: BiosOptionsST;
  /**
   *
   * @param biosConfig - Bios Settings
   */
  constructor(biosConfig: BiosOptionsST) {
    this.biosConfig = biosConfig;
    this.selectedBootPriority = this.biosConfig.Boot.settings.boot_priority.selected;
  }
  /**
   * Checks all necessary parts of the setup
   */
  public check(): void {
    BlackscreenComponent.cursor = new animationCursor();
    BlackscreenComponent.cursor.blinking();
    setTimeout(() => {
      if (this.checkBootSector()) {
      }
    }, 1350);
  }

  /**
   * Checks the disk to see if there is something to boot from
   */
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
