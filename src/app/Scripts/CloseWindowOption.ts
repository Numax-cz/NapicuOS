import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';
import { ItemsDateInit } from './OpenWindowOption';
import { setTimeInterval } from './TimeController';
import { isTime, isOption, isDate } from './Type';
//TODO clear code
export function CloseWindowOptionUnsave(): void {
  if (BiosComponent.WindowFastOptionDisplay) {
    if (isTime(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].time = ItemsDateInit;
      setTimeInterval(SettingsTemplateComponent.MainOption, SettingsTemplateComponent.selected);
    } else if (isDate(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].date = ItemsDateInit;
    }
  }
  close();
}
export function CloseWindowOptionSave(): void {
  if (isOption(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
    SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].selected = BiosComponent.WindowSelectedOption;
  } else if (isTime(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
    setTimeInterval(SettingsTemplateComponent.MainOption, SettingsTemplateComponent.selected);
  }
  close();
}

function close() {
  BiosComponent.WindowDisplay = false;
  BiosComponent.WindowFastOptionDisplay = false;
}
