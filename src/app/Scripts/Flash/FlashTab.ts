import { FlashComponent } from 'src/app/flash/flash.component';


export function FlashTab(): void {
  if (FlashComponent.SelectedWindow == 0) {
    if (FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir.length) {
      FlashComponent.SelectedWindow = 1;
    }
  } else {
    FlashComponent.SelectedFile = 0;
    FlashComponent.SelectedWindow = 0;
    FlashComponent.Scroll.scrollTo(0, 0);
  }
  FlashComponent.PathFile = [];
}
