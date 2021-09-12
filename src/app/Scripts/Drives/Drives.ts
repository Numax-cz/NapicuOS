import { drive } from "src/app/Array/Drives";
import { Drives } from "src/app/interface/Directories";
import { SystemDrives } from "src/app/interface/SystemDrives";
import { Options } from "src/app/interface/ToolSettings";

/**
 * Function that converts an object of type Drives[] to type Options[]
 * @param num Specifies whether the output title will have an index before the main text.
 */
export function GetDrives(num?: boolean): Options[] {
  if (!num) num = false;
  var D: Options[] = [];
  drive.forEach((element: SystemDrives, index: number) => {
    var text = num ? `${index + 1}. ${element.title}` : element.title;
    D.push({ title: text });
  });
  return D;
}
