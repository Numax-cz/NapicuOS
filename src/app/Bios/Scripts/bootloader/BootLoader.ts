import {drive} from 'src/app/Bios/Config/Drives';
import {BiosOptionsST} from 'src/app/Bios/ToolSettings';
import {BlackscreenComponent} from 'src/app/Bios/components/blackscreen/blackscreen.component';
import {NoBootDevice} from 'src/app/Bios/Config/BlackScreenTexts';

import {GrubComponent} from 'src/app/Grub/grub/grub.component';
import {Navigate} from '../BiosRouter';
import {copy} from '../DeepClone';
import {Loading} from '../LoadingAnimations';
import {animationCursor, setDisplayText} from './text';
import {boot_configuration} from "../../Config/bootloader";

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
    this.selectedBootPriority =
      this.biosConfig.Boot.settings.boot_priority.selected;
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
    }, boot_configuration.bootloader_blackscreen_timeout);
  }

  /**
   * Functions to continue to the system
   */
  protected system(): void {
    setTimeout(() => {
      var system = drive[this.selectedBootPriority].data.system;
      if (system) {
        if (
          system.length &&
          system.length - 1 >= 1 &&
          !GrubComponent.GrubActiveSystem
        ) {
          GrubComponent.GrubSystems = system;
          Loading('/grub', boot_configuration.grub_time_out,boot_configuration.grub_time_in);
        } else {
          GrubComponent.GrubActiveSystem = system[0];
          GrubComponent.GrubActiveSystem.Start();
          Navigate('/system');
        }
      } else {
        //TODO Error system boot
      }
    }, boot_configuration.system_enter);
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
