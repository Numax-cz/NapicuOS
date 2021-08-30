import { WriteInformations } from 'src/app/Array/FlashInformation';
import { BiosComponent } from 'src/app/bios/bios.component';
import { OptionPanelComponent } from 'src/app/option-panel/option-panel.component';

export function OptionAlert() {}

export function FileIsUnsupported(): void {
  OptionPanelComponent.OpenWindow([{ title: 'Ok' }], 'This file is not supported!', undefined, true, true);
}
export function ReadyToFlash(): void {
  WriteInformations();
  OptionPanelComponent.OpenWindow(
    [{ title: 'Yes' }, { title: 'No' }],
    'Are you sure to update BIOS?',
    () => {alert("xd")},
    true,
    true
  );
}
