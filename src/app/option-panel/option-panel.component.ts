import { Component, OnInit } from '@angular/core';
import { BiosSettings } from '../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { WindowItems } from '../Scripts/Type';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  /**
   * Popup title
   */
  public static Title: string;
  /**
   * Function that is called when the window is closed (yes/ok...)
   */
  public static CallBack: Function | undefined;
  /**
   * Determines, if the Items will be horizontal
   */
  public static Horizontal: boolean;
  /**
   * Function that opens a popup window
   * @param WindowItems Items that will be in the popup window
   * @param title Title popup window
   * @param CallBack A function that is triggered if the popup is yes/no and the user has selected yes
   * @param WindowError Determines, if the popup window will be red (warning)
   * @param Horizontal Determines, if the Items will be horizontal
   */
  public static OpenWindow(WindowItems: WindowItems, title?: string, CallBack?: Function, WindowError?: boolean, Horizontal?: boolean): void {
    var getSelectedItem = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected];
    if (WindowError) BiosComponent.WindowError = true;
    if (Horizontal) OptionPanelComponent.Horizontal = true;
    if (title) {
      OptionPanelComponent.Title = title;
    } else if (getSelectedItem) {
      OptionPanelComponent.Title = getSelectedItem.title;
    } else {
      OptionPanelComponent.Title = 'Undefined';
    }
    OptionPanelComponent.CallBack = CallBack;
    BiosComponent.WindowItems = WindowItems;
    BiosComponent.WindowDisplay = true;
  }
  public static OpenFastWindow(WindowItems: WindowItems): void {
    BiosComponent.WindowItems = WindowItems;
    BiosComponent.WindowFastOptionDisplay = true;
  }
  get Items(): Array<any> {
    return BiosComponent.WindowItems;
  }
  get Horizontal(): boolean {
    return OptionPanelComponent.Horizontal;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
  get SelectedTitle(): string {
    return OptionPanelComponent.Title;
  }
  get Error(): boolean {
    return BiosComponent.WindowError;
  }
}
