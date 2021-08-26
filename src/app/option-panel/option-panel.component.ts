import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { SettingsTemplateComponent } from '../settings-template/settings-template.component';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  public static Title: string;
  public static OpenWindow(title?: string): void {
    var getSelectedItem = SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected];
    if (title) {
      OptionPanelComponent.Title = title;
    } else if (getSelectedItem) {
      OptionPanelComponent.Title = getSelectedItem.title;
    } else {
      OptionPanelComponent.Title = 'Undefined';
    }
    BiosComponent.WindowDisplay = true;
  }

  get Items(): Array<any> {
    return BiosComponent.WindowItems;
  }

  get Horizontal(): boolean {
    if (BiosComponent.WindowItems[0].title === 'Yes') return true;
    return false;
  }

  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }

  get SelectedTitle(): string {
    return OptionPanelComponent.Title;
  }
}
