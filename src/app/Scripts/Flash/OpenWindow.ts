import { WriteInformations, WriteInformationsDefault } from 'src/app/Array/FlashInformation';
import { BiosComponent } from 'src/app/bios/bios.component';
import { FlashComponent } from 'src/app/flash/flash.component';
import { OptionPanelComponent } from 'src/app/option-panel/option-panel.component';
import { Window } from '../Window';

export function OptionAlert() {}

export function FileIsUnsupported(): void {
  OptionPanelComponent.window = new Window([{ title: 'Ok' }], 'This file is not supported!', undefined, true, true);
}

export function ReadyToFlash(): void {
  WriteInformations();
  OptionPanelComponent.window = new Window(
    [{ title: 'Yes' }, { title: 'No' }],
    'Are you sure to update BIOS?',
    () => {},
    true,
    true,
    () => {
      setTimeout(() => {
        FlashComponent.Flashing = false;
        WriteInformationsDefault();
      }, 250);
    }
  );
}
