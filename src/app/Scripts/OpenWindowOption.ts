import { BiosComponent } from '../bios/bios.component';
import { isTime, isOption, isDate, isOptionsFast } from './Type';
import { Time } from '../interface/ToolSettings';
import { clearTimeInterval } from './TimeController';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';
import { OptionPanelComponent } from '../option-panel/option-panel.component';

export var ItemsDateInit: Time[];
export var nevim: any = {};
//TODO Clear Code => Function
export function OpenWindowOption(): void {
  if (SettingsTemplateComponent.MainOption.length) {
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
    } else if (isOptionsFast(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      BiosComponent.WindowItems = [{ title: 'Yes' }, { title: 'No' }];
      BiosComponent.WindowDisplay = true;
    } else {
      console.error('Error Array');
      console.error(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected]);
    }
  }
}
