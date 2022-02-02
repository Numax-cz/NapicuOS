import {setNewBiosinf, WriteInformationsDefault} from 'src/app/Array/FlashInformation';
import {FlashComponent} from 'src/app/Bios/flash/flash.component';
import {OptionPanelComponent} from 'src/app/Bios/option-panel/option-panel.component';
import {Reboot} from '../exit/Reboot';

export function FlashingDone(): void {
    OptionPanelComponent.window = undefined;
    FlashComponent.Flashing = false;
    WriteInformationsDefault();
    setNewBiosinf();
    Reboot();
}
