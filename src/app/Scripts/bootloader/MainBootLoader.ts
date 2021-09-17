import { drive } from 'src/app/Array/Drives';
import { BiosSettings } from 'src/app/Array/ToolSettings';
import { NoBootDevice } from 'src/app/Config/BlackScreenTexts';
import { setTime } from '../TimeDate';
import { animationCursor, setDisplayText } from './text';
/**
 * Checks the disk to see if there is something to boot from
 */
export function checkBootDrive(): void { //TODO rename
  var selected: number = BiosSettings.Boot.settings.boot_priority.selected;
  let test = new animationCursor();
  test.blinking();


  setTimeout(() => {
    if (checkBootDevice(selected)) {

    }
  }, 1350);
}

function checkBootDevice(selected: number): boolean {
  if (drive && drive.length && drive[selected].data) {
    if (!drive[selected].data.boot) {
      setDisplayText(NoBootDevice);
      return false;
    }
    return true;
  } else {
    //TODO No drives found
    return false;
  }
}
