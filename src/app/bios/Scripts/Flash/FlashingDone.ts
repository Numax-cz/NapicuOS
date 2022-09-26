import {setNewBiosinf, WriteInformationsDefault,} from 'src/app/bios/Config/FlashInformationData';
import {FlashComponent} from 'src/app/bios/components/flash/flash.component';
import {OptionPanelComponent} from 'src/app/bios/components/option-panel/option-panel.component';
import {Reboot} from '../exit/Reboot';

export function FlashingDone(): void {
  OptionPanelComponent.window = undefined;
  FlashComponent.Flashing = false;
  WriteInformationsDefault();
  setNewBiosinf();
  Reboot();
}
