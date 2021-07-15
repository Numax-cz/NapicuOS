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

  ngOnInit(): void {}

  get Items(): SettingsOptions[] {
    return BiosComponent.WindowItems;
  }

}
