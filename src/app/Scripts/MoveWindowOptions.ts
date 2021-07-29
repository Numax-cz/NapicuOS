import { BiosComponent } from '../bios/bios.component';
export function MoveWindowOptions(keyCode: number): void {
  var KeyCodeArrow1 = BiosComponent.WindowFastOptionDisplay ? 39 : 40;
  var KeyCodeArrow2 = BiosComponent.WindowFastOptionDisplay ? 37 : 38;

  if (keyCode == KeyCodeArrow2 && BiosComponent.WindowSelectedOption > 0) {
    BiosComponent.WindowSelectedOption -= 1;
  }
  if (keyCode == KeyCodeArrow1 && BiosComponent.WindowSelectedOption < BiosComponent.WindowItems.length - 1) {
    BiosComponent.WindowSelectedOption += 1;
  }
}
