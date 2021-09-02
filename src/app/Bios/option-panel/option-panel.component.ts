import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { Window } from 'src/app/Scripts/Window';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  /**
   * Specifies whether the popup - 1 window is open or closed (Option-Panel)
   */
  public static window: Window | undefined;
  /**
   * Function that is called when the window is closed (yes/ok...)
   */
  public static CallBack: Function | undefined;
  public static CallBackD: Function | undefined;

  get Items(): Array<any> {
    if (OptionPanelComponent.window) return OptionPanelComponent.window.WindowItems;
    return [];
  }
  get Horizontal(): boolean {
    if (OptionPanelComponent.window) return OptionPanelComponent.window.Horizontal;
    return false;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
  get SelectedTitle(): string {
    if (OptionPanelComponent.window) return OptionPanelComponent.window.title;
    return 'Undefined';
  }
  get Error(): boolean {
    if (OptionPanelComponent.window) return OptionPanelComponent.window.WindowError;
    return false;
  }
}
