import { FlashComponent } from 'src/app/flash/flash.component';

export function FlashTab(): void {
  if (FlashComponent.SelectedWindow == 0) {
    FlashComponent.SelectedWindow = 1;
  } else {
    FlashComponent.SelectedFile = 0;
    FlashComponent.SelectedWindow = 0;
  }
}
