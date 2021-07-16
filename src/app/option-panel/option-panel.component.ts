import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { SettingsOptions } from '../interface/SettingsOptions';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void { }
  
  ngOnDestroy(): void {
    BiosComponent.WindowSelectedOption = 0;
  }

  get Items(): SettingsOptions[] {
    return BiosComponent.WindowItems;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
}
