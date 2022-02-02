import {drive} from 'src/app/Array/Drives';
import {SystemDrives} from 'src/app/interface/SystemDrives';
import {Options} from 'src/app/interface/ToolSettings';

/**
 * Function that converts an object of type Drives[] to type Options[]
 * @param num Specifies whether the output title will have an index before the main text.
 * @param systemName Specifies whether the system name will be at the end of the drive name.
 */
export function GetDrives(num?: boolean, systemName?: boolean): Options[] {
  if (!num) num = false;
  var D: Options[] = [];
  drive.forEach((element: SystemDrives, index: number) => {
    var text = num ? `${index + 1}. ${element.title}` : element.title;
    if (systemName && element.data.system && element.data.system.length == 1) {
      text += `(${element.data.system[0].boot.title})`;
    }
    D.push({ title: text });
  });
  return D;
}
