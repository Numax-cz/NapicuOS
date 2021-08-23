import { FlashComponent } from 'src/app/flash/flash.component';
import { directories } from 'src/app/interface/Directories';
import { CheckBIOSFile } from './Flash';

export function CheckFile(): void {
  var dir = FlashComponent.SelectedDir;
  var file = FlashComponent.SelectedFile;
  var isDir = FlashComponent.FlashDrive[dir].dir[file].dir;

  if (isDir) {
  } else {
    CheckBIOSFile(FlashComponent.FlashDrive[dir].dir[file].title);
  }
}
