import { disableDebugTools } from '@angular/platform-browser';
import { BiosComponent } from '../bios/bios.component';
import { OptionPanelComponent } from '../option-panel/option-panel.component';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';
import { ItemsDateInit } from './OpenWindowOption';
import { setTimeInterval } from './TimeController';
import { isTime, isOption, isDate, isOptionsFast } from './Type';
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
  } else if (isDate(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
    //? There is nothing to see
  } else if (OptionPanelComponent.CallBack) {
    if (BiosComponent.WindowSelectedOption !== 0 && BiosComponent.WindowSelectedOption !== 1) {
      ErrorOptionFunction();
    }
    if (BiosComponent.WindowSelectedOption == 0) {
      if (OptionPanelComponent.CallBack) OptionPanelComponent.CallBack();
    }
  }
  close();
}

function close() {
  BiosComponent.WindowDisplay = false;
  BiosComponent.WindowError = false;
  BiosComponent.WindowFastOptionDisplay = false;
  OptionPanelComponent.CallBack = undefined;
  BiosComponent.WindowItems = [];
  BiosComponent.WindowSelectedOption = 0;
  OptionPanelComponent.Horizontal = false;
}

function ErrorOptionFunction(): void {
  console.error('Only values 1 or 0 can be used for input. More options are not supported');
}
