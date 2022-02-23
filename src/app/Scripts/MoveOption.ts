import {SettingsTemplateComponent} from '../Bios/settings-template/settings-template.component';
import {objectKeys} from './objectKeys';

export function MoveOption(keyCode: number): void {
  // ArrowDown
  if (!SettingsTemplateComponent.MainOption) return;
  if (
    keyCode == 40 &&
    SettingsTemplateComponent.selected <
    objectKeys(SettingsTemplateComponent.MainOption).length - 1
  ) {
    SettingsTemplateComponent.selected += 1;
  }
  //ArrowUp
  if (keyCode == 38 && SettingsTemplateComponent.selected > 0) {
    SettingsTemplateComponent.selected -= 1;
  }
}
