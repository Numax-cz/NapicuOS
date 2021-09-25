import { drive } from 'src/app/Array/Drives';
import { BiosOptionsST, BiosSettings } from 'src/app/Array/ToolSettings';
import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { NoBootDevice } from 'src/app/Config/BlackScreenTexts';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { LoadsComponent } from 'src/app/System/loads/loads.component';
import { SystemComponent } from 'src/app/System/system/system.component';
import { copy } from '../DeepClone';
import { Loading } from '../LoadingAnimations';
import { animationCursor, setDisplayText } from './text';

/**
 * Main part of the system bootloader
 */
export class BootLoader {
  /**
   * Selected disk priority
   */
  protected selectedBootPriority: number;
  /**
   * Full bios config
   */
  protected biosConfig: BiosOptionsST;
  /**
   *
   * @param biosConfig - Bios config
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
        BlackscreenComponent.cursor?.moveDown(() => this.system());
      }
    }, 1350);
  }

  /**
   * Functions to continue to the system
   */
  protected system(): void {
    setTimeout(() => {
      var system = drive[this.selectedBootPriority].data.system;
      if (system) {
        if (system.length && system.length - 1 >= 1 && !SystemComponent.System) {
          GrubComponent.Systems = system;
          Loading('/grub', 500, 1050); //TODO TimeSame
        } else {
          SystemComponent.System = system[0];
          Loading('/booting', 500, 1050); //TODO TimeSame
        }
      } else {
        //TODO Error system boot
      }
    }, 1250); //TODO Config
  }

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






