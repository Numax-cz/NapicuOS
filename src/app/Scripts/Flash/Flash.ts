import { FlashingText } from 'src/app/Array/FlashInformation';
import { FlashComponent } from 'src/app/flash/flash.component';
import { OptionPanelComponent } from 'src/app/option-panel/option-panel.component';
import { Window } from '../Window';
import { ReadyToFlash, SuccesFlash } from './OpenWindow';
import { ProgressBar } from './ProgressBar';

export function CheckBIOSFile() {
  FlashComponent.Flashing = true;
  FlashComponent.FlashingText = FlashingText[0];
  ProgressBar(97, 'Bar', () => {
    //TODO Alert
    ReadyToFlash();
  });
}
export function ErasingBIOS() {
  FlashComponent.FlashingText = FlashingText[1];
  ProgressBar(
    56,
    'Bar1',
    () => {
      WritingBIOS();
    },
    80
  );
}
export function WritingBIOS() {
  FlashComponent.FlashingText = FlashingText[2];
  ProgressBar(77, 'Bar2', () => {
    VerifyingBIOS();
  });
}

export function VerifyingBIOS() {
  FlashComponent.FlashingText = FlashingText[3];
  ProgressBar(33, 'Bar3', () => {
    SuccesFlash();
  });
}
