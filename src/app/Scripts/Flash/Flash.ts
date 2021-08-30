import { FlashingText } from 'src/app/Array/FlashInformation';
import { FlashComponent } from 'src/app/flash/flash.component';
import { ReadyToFlash } from './OpenWindow';
import { ProgressBar } from './ProgressBar';

export function CheckBIOSFile() {
  FlashComponent.Flashing = true;
  FlashComponent.FlashingText = FlashingText[0];
  ProgressBar(200, () => {
    //TODO Alert
    ReadyToFlash();
  });
}
export function ErasingBIOS() {
  FlashComponent.FlashingText = FlashingText[1];
}
export function WritingBIOS() {
  FlashComponent.FlashingText = FlashingText[2];
}
export function VerifyingBIOS() {
  FlashComponent.FlashingText = FlashingText[3];
}