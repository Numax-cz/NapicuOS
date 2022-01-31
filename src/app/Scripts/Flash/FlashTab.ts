import {FlashComponent} from "src/app/Bios/flash/flash.component";

//TODO @Document
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
  FlashComponent.listDir = FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
}
