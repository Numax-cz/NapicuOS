import { BiosComponent } from '../bios/bios.component';
import { OptionPanelComponent } from '../option-panel/option-panel.component';

export function MoveWindowOptions(keyCode: number): void {
  // ArrowDown
  var Arrow1 = OptionPanelComponent.MainTitle ? 39 : 40;
  var Arrow2 = OptionPanelComponent.MainTitle ? 37 : 38;
  if (
    keyCode == Arrow1 &&
    BiosComponent.WindowSelectedOption < BiosComponent.WindowItems.length - 1
  ) {
    BiosComponent.WindowSelectedOption += 1;
  }
  //ArrowUp
  if (keyCode == Arrow2 && BiosComponent.WindowSelectedOption > 0) {
    BiosComponent.WindowSelectedOption -= 1;
  }
}
