import {FlashComponent} from 'src/app/bios/components/flash/flash.component';
import {CheckBIOSFile} from './Flash';
import {FileIsUnsupported} from './OpenWindow';

export function CheckFile(): void {
  const exit = '..';
  var path = FlashComponent.listDir[FlashComponent.SelectedFile];
  if (path.noEnter) return;
  if (path && path.dir) {
    if ((path.dir[0] && path.dir[0].title !== exit) || !path.dir[0]) {
      path.dir.unshift({title: exit});
    }

    FlashComponent.PathFile.push(path);
    FlashComponent.listDir = path.dir;
    FlashComponent.SelectedFile = 0;
  } else if (path.biosFile) {
    CheckBIOSFile();
  } else if (path.title) {
    if (path.title === exit) {
      var index = FlashComponent.PathFile.length - 1;
      if (index == 0) {
        FlashComponent.listDir =
          FlashComponent.FlashDrive[FlashComponent.SelectedDir].dir;
        FlashComponent.PathFile = [];
      } else {
        FlashComponent.PathFile.pop();
        var newDir = FlashComponent.PathFile[index - 1];
        if (newDir.dir) {
          FlashComponent.listDir = newDir.dir;
        }
      }
    } else {
      FileIsUnsupported();
    }
  } else {
    //TODO ERROR Idk
  }
}
