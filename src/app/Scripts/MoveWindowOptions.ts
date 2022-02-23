import {BiosComponent} from '../Bios/bios/bios.component';
import {OptionPanelComponent} from '../Bios/option-panel/option-panel.component';

export function MoveWindowOptions(keyCode: number): void {
  if (!OptionPanelComponent.window) return;
  var KeyCodeArrow1 =
    BiosComponent.WindowFastOptionDisplay ||
    OptionPanelComponent.window.Horizontal
      ? 39
      : 40;
  var KeyCodeArrow2 =
    BiosComponent.WindowFastOptionDisplay ||
    OptionPanelComponent.window.Horizontal
      ? 37
      : 38;

  if (keyCode == KeyCodeArrow2 && BiosComponent.WindowSelectedOption > 0) {
    BiosComponent.WindowSelectedOption -= 1;
  }
  if (
    keyCode == KeyCodeArrow1 &&
    BiosComponent.WindowSelectedOption <
    OptionPanelComponent.window.WindowItems.length - 1
  ) {
    BiosComponent.WindowSelectedOption += 1;
  }
}
