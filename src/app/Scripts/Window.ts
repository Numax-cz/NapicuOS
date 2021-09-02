import { disableDebugTools } from '@angular/platform-browser';

import { setTimeInterval } from './TimeController';
import { isTime, isOption, isDate, isOptionsFast } from './Type';
import { WindowItems } from './Type';
import { settings, Time } from '../interface/ToolSettings';
import { ItemsDateInit } from './SetWindowOption';
import { BiosComponent } from '../Bios/bios/bios.component';
import { OptionPanelComponent } from '../Bios/option-panel/option-panel.component';
import { SettingsTemplateComponent } from '../Bios/settings-template/settings-template.component';
//TODO clear code
/**
 * Class for pop up window
 */
export class Window {
  /**
   * Items that are used in the popup window (Option-Panel)
   */
  WindowItems: WindowItems;
  /**
   * Popup title
   */
  title: string;
  /**
   * Function that is called when WindowSelectedOption(yes) = 0
   */
  CallBack: Function | undefined;
  /**
   * Specifies whether the window will be "red"
   */
  WindowError: boolean;
  /**
   * Determines, if the Items will be horizontal
   */
  Horizontal: boolean;
  /**
   * Function that is called when WindowSelectedOption(no) = 1
   */
  CallBackD: Function | undefined;

  /**
   *
   * @param WindowItems Items that will be in the popup window
   * @param title Title popup window
   * @param CallBack A function that is triggered if the popup is yes/no and the user has selected YES
   * @param WindowError Determines, if the popup window will be red (warning)
   * @param Horizontal Determines, if the Items will be horizontal
   * @param CallBackD A function that is triggered if the popup is yes/no and the user has selected NO
   */
  constructor(WindowItems: WindowItems, title?: string, CallBack?: Function, WindowError?: boolean, Horizontal?: boolean, CallBackD?: Function) {
    this.WindowItems = WindowItems || [];
    this.title = title || 'Undefined';
    this.WindowError = WindowError || false;
    this.Horizontal = Horizontal || false;
    this.CallBack = CallBack || undefined;
    this.CallBackD = CallBackD || undefined;
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
    } else if (this.CallBack && BiosComponent.WindowSelectedOption == 0) {
      this.CallBack();
    } else if (this.CallBackD && BiosComponent.WindowSelectedOption == 1) {
      this.CallBackD();
    }
    this.close();
  }
  
  /**
   * Function that closes the popup window
   */
  public close() {
    BiosComponent.WindowSelectedOption = 0;
    BiosComponent.WindowFastOptionDisplay = false;
    OptionPanelComponent.CallBack = undefined;
    OptionPanelComponent.window = undefined;
  }
}
