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
    return SettingsTemplateComponent.MainOption[SettingsTemplateComponent.selected].title;
  }
}
