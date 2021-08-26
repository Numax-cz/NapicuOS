import { FlashingText } from 'src/app/Array/FlashInformation';
import { FlashComponent } from 'src/app/flash/flash.component';
import { ProgressBar } from './ProgressBar';

export function Flash(): void {
  FlashComponent.Flashing = true;
  //ProgressBar();
}

export function CheckBIOSFile() {
  FlashComponent.FlashingText = FlashingText[0];
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
