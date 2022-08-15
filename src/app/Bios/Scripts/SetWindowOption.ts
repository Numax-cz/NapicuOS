import {isDate, isOption, isOptionsFast, isTime} from './Type';
import {BiosTime, settings} from '../interface/ToolSettings';
import {clearTimeInterval} from './TimeController';
import {BiosComponent} from '../components/bios/bios.component';
import {OptionPanelComponent} from '../components/option-panel/option-panel.component';
import {SettingsTemplateComponent} from '../components/settings-template/settings-template.component';
import {Window} from './Window';
import {copy} from './DeepClone';
import {getSelectedItem} from './getSelectedItem';

export var ItemsDateInit: BiosTime[];

export function SetWindowOption(): void {
  let selected: settings = getSelectedItem();

  if (selected) {
    if (isOption(selected)) {
      var options = selected.options;
      if (!options) return;
      OptionPanelComponent.window = new Window(options);
    } else if (isTime(selected)) {
      var time = selected.time;
      if (!time) return;
      ItemsDateInit = copy(time);
      OptionPanelComponent.window = new Window(time);
      BiosComponent.WindowFastOptionDisplay = true;
      clearTimeInterval(
        SettingsTemplateComponent.MainOption,
        SettingsTemplateComponent.selected
      );
    } else if (isDate(selected)) {
      var date = selected.date;
      if (!date) return;
      ItemsDateInit = copy(date);
      OptionPanelComponent.window = new Window(date);
      BiosComponent.WindowFastOptionDisplay = true;
    } else if (isOptionsFast(selected)) {
      var title = selected.title;
      var fun = selected.optionsFast;
      if (!fun) return;
      OptionPanelComponent.window = new Window(
        [{title: 'Yes'}, {title: 'No'}],
        title,
        fun,
        false,
        true
      );
    } else {
      console.error('Error Array');
      console.error(selected);
    }
  }
}
