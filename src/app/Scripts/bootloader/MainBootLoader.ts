import { drive } from 'src/app/Array/Drives';
import { BiosSettings } from 'src/app/Array/ToolSettings';
import { setTime } from '../TimeDate';
import { animationCursor, setDisplayText } from './text';
/**
 * Checks the disk to see if there is something to boot from
 */
export function checkBootDrive(): void {
  var selected: number = BiosSettings.Boot.settings.boot_priority.selected;
  let test = new animationCursor();
  test.blinking();
  setTimeout(() => {
    if (drive && drive.length && drive[selected].data) {
      if (drive[selected].data.boot) {
      } else {
      }

      setTimeout(() => {
        test.moveDown();
      }, 2000);
    } else {
      //TODO No drives found
      setDisplayText(['TO JE PEPEGA NO TAK TO JSEM NEVIDĚL']);
    }
  }, 200);
}
