import { FlashComponent } from 'src/app/flash/flash.component';

export function CheckFile(): void {
  const exit = '..';
  var path = FlashComponent.listDir[FlashComponent.SelectedFile];

  if (path.dir) {
    if (path.dir[0] && path.dir[0].title !== exit) {
      path.dir.unshift({ title: exit });
    }
    FlashComponent.PathFile.push(path);
    FlashComponent.listDir = path.dir;
  } else if (path.title) {
    if (path.title === exit) {
      FlashComponent.PathFile.pop();
      var index = FlashComponent.PathFile.length - 1;
      var newDir = FlashComponent.PathFile[index].dir;
      if (newDir) {
        FlashComponent.listDir = newDir;
      }
    }
    //CheckBIOSFile(FlashComponent.FlashDrive[dir].dir[file].title);
  }
  console.log(FlashComponent.PathFile);
}
