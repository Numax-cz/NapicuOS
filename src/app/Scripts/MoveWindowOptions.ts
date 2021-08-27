import { BiosComponent } from '../bios/bios.component';
import { OptionPanelComponent } from '../option-panel/option-panel.component';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';
import { isOptionsFast } from './Type';
export function MoveWindowOptions(keyCode: number): void {
  var KeyCodeArrow1 = BiosComponent.WindowFastOptionDisplay || OptionPanelComponent.Horizontal ? 39 : 40;
  var KeyCodeArrow2 = BiosComponent.WindowFastOptionDisplay || OptionPanelComponent.Horizontal ? 37 : 38;

  if (keyCode == KeyCodeArrow2 && BiosComponent.WindowSelectedOption > 0) {
    BiosComponent.WindowSelectedOption -= 1;
  }
  if (keyCode == KeyCodeArrow1 && BiosComponent.WindowSelectedOption < BiosComponent.WindowItems.length - 1) {
    BiosComponent.WindowSelectedOption += 1;
  }
}
