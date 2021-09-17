import { drive } from 'src/app/Array/Drives';
import { BiosSettings } from 'src/app/Array/ToolSettings';
import { NoBootDevice } from 'src/app/Config/BlackScreenTexts';
import { Navigate } from '../BiosRouter';
import { setTime } from '../TimeDate';
import { animationCursor, setDisplayText } from './text';
/**
 * Checks the disk to see if there is something to boot from
 */
export function BootLoader(): void {
  Navigate('/blackscreen');
  var selected: number = BiosSettings.Boot.settings.boot_priority.selected;
  let test = new animationCursor();
  test.blinking();

  setTimeout(() => {
    if (checkBootSector(selected)) {
    }
  }, 1350);
}

function checkBootSector(selected: number): boolean {
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
