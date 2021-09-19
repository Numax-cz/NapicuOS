import { drive } from 'src/app/Array/Drives';
import { BiosOptionsST, BiosSettings } from 'src/app/Array/ToolSettings';
import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { NoBootDevice } from 'src/app/Config/BlackScreenTexts';
import { copy } from '../DeepClone';
import { Loading } from '../LoadingAnimations';
import { animationCursor, setDisplayText } from './text';

/**
 * Main part of the system bootloader
 */
export class BootLoader {
  protected selectedBootPriority: number;
  protected biosConfig: BiosOptionsST;
  /**d
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
        setTimeout(() => {
          BlackscreenComponent.cursor?.moveDown(() => {
            Loading('/booting', 500, 1050);
          });
        }, 1230);
      }
    }, 1350);
  }
  /**
   * Functions to continue to the system
   */
  protected system(): void {}
  /**
   * Checks the disk to see if there is something to boot from
   */
  protected checkBootSector(): boolean {
    if (drive && drive.length && drive[this.selectedBootPriority].data) {
      if (!drive[this.selectedBootPriority].data.system) {
        setDisplayText(copy(NoBootDevice));
        return false;
      }
      return true;
    } else {
      //TODO No drives found
      return false;
    }
  }
}
