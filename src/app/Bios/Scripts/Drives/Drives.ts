import {VM_COMPUTER_DRIVES_METADATA} from 'src/app/Bios/interface/SystemDrives';
import {Options} from 'src/app/Bios/interface/ToolSettings';
import {VM_COMPUTER_INFORMATION} from "../../vm_computer";

/**
 * Function that converts an object of type Drives[] to type Options[]
 * @param num Specifies whether the output title will have an index before the main text.
 * @param systemName Specifies whether the system name will be at the end of the drive name.
 */
export function GetDrives(num?: boolean, systemName?: boolean): Options[] {
  if (!num) num = false;
  var D: Options[] = [];
  VM_COMPUTER_INFORMATION.drives.forEach((element: VM_COMPUTER_DRIVES_METADATA, index: number) => {
    var text = num ? `${index + 1}. ${element.title}` : element.title;
    if (systemName && element.data.system && element.data.system.length == 1) {
      text += `(${element.data.system[0].boot.title})`;
    }
    D.push({title: text});
  });
  return D;
}
