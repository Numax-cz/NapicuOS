import {WriteInformations, WriteInformationsDefault,} from 'src/app/bios/config/FlashInformationData';
import {FlashComponent} from 'src/app/bios/components/flash/flash.component';
import {OptionPanelComponent} from 'src/app/bios/components/option-panel/option-panel.component';
import {reboot} from 'src/app/bios/config/Animation/Flash';
import {Window} from '../Window';
import {ErasingBIOS} from './Flash';
import {FlashingDone} from './FlashingDone';

export function FileIsUnsupported(): void {
  OptionPanelComponent.window = new Window(
    [{title: 'Ok'}],
    'This file is not supported!',
    undefined,
    true,
    true
  );
}

export function ReadyToFlash(): void {
  WriteInformations();
  FlashComponent.Flashing = false;
  OptionPanelComponent.window = new Window(
    [{title: 'Yes'}, {title: 'No'}],
    'Are you sure to update BIOS?',
    () => {
      ErasingBIOS();
    },
    true,
    true,
    () => {
      setTimeout(() => {
        WriteInformationsDefault();
      }, 250);
    }
  );
}

export function SuccesFlash(): void {
  OptionPanelComponent.window = new Window(
    [],
    'Update is done! System will reboot.',
    undefined,
    true,
    true
  );
  setTimeout(() => {
    FlashingDone();
  }, reboot);
}
