import { disableDebugTools } from '@angular/platform-browser';
import { BiosComponent } from '../bios/bios.component';
import { OptionPanelComponent } from '../option-panel/option-panel.component';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';
import { ItemsDateInit } from './OpenWindowOption';
import { setTimeInterval } from './TimeController';
import { isTime, isOption, isDate, isOptionsFast } from './Type';
import { WindowItems } from './Type';
import { settings } from '../interface/ToolSettings';
//TODO clear code

export class Window {
  //TODO No-Static
  WindowItems: WindowItems | undefined;
  title: string | undefined;
  CallBack: Function | undefined;
  WindowError: boolean | undefined;
  Horizontal: boolean | undefined;
  CallBackD: Function | undefined;
  constructor(WindowItems: WindowItems, title?: string, CallBack?: Function, WindowError?: boolean, Horizontal?: boolean, CallBackD?: Function) {
    this.WindowItems = WindowItems;
    this.title = title;
    this.CallBack = CallBack;
    this.WindowError = WindowError;
    this.Horizontal = Horizontal;
    this.CallBackD = CallBackD;
  }

  public CloseUnsave() {
    if (BiosComponent.WindowFastOptionDisplay) {
      if (isTime(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
        SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].time = ItemsDateInit;
      } else if (isDate(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
        SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].date = ItemsDateInit;
      }
    }
    this.close();
  }

  public CloseSave() {
    if (isOption(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].selected = BiosComponent.WindowSelectedOption;
    } else if (isTime(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      setTimeInterval(SettingsTemplateComponent.MainOption, SettingsTemplateComponent.selected);
    } else if (isDate(SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected])) {
      //? There is nothing to see
    } else if (OptionPanelComponent.CallBack && BiosComponent.WindowSelectedOption == 0) {
      OptionPanelComponent.CallBack();
    } else if (OptionPanelComponent.CallBackD && BiosComponent.WindowSelectedOption == 1) {
      OptionPanelComponent.CallBackD();
    }
    this.close();
  }

  public close() {
    BiosComponent.WindowDisplay = false;
    BiosComponent.WindowError = false;
    BiosComponent.WindowFastOptionDisplay = false;
    OptionPanelComponent.CallBack = undefined;
    BiosComponent.WindowItems = [];
    BiosComponent.WindowSelectedOption = 0;
    OptionPanelComponent.Horizontal = false;
  }
}
