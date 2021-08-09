import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';

export function MoveOption(keyCode: number): void {
  // ArrowDown
  if (!SettingsTemplateComponent.MainOption) return;
  if (keyCode == 40 && SettingsTemplateComponent.selected < SettingsTemplateComponent.MainOption.length - 1) {
    SettingsTemplateComponent.selected += 1;
  }
  //ArrowUp
  if (keyCode == 38 && SettingsTemplateComponent.selected > 0) {
    SettingsTemplateComponent.selected -= 1;
  }
  //console.log(SettingsTemplateComponent.selected); //! Problem nevím co to je totoototo

  
}
