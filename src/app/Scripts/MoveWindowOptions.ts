import { BiosComponent } from '../bios/bios.component';

export function MoveWindowOptions(keyCode: number): void {
  // ArrowDown
  if (
    keyCode == 40 &&
    BiosComponent.WindowSelectedOption < BiosComponent.WindowItems.length - 1
  ) {
    BiosComponent.WindowSelectedOption += 1;
  }
  //ArrowUp
  if (keyCode == 38 && BiosComponent.WindowSelectedOption > 0) {
    BiosComponent.WindowSelectedOption -= 1;
  }
}
