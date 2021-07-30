import { BiosMainComponent } from '../bios-main/bios-main.component';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { isTime, isOption, isDate } from './Type';
import { Time } from '../interface/ToolSettings';
import { clearTimeInterval } from './TimeController';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';

export var ItemsDateInit: Time[];
export var nevim: any = {};
export function OpenWindowOption(): void {
  if (SettingsTemplateComponent) {
    if (isOption(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      BiosComponent.WindowItems = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].options;
      BiosComponent.WindowDisplay = true;
    } else if (isTime(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      ItemsDateInit = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].time.map((x) => Object.assign({}, x));
      BiosComponent.WindowItems = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].time;
      BiosComponent.WindowFastOptionDisplay = true;
      clearTimeInterval(SettingsTemplateComponent.MainOption, SettingsTemplateComponent.selected);
    } else if (isDate(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      ItemsDateInit = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].date.map((x) => Object.assign({}, x));
      BiosComponent.WindowItems = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].date;
      BiosComponent.WindowFastOptionDisplay = true;
    } else {
      console.log("Error Array");
      
    }
  }
}
