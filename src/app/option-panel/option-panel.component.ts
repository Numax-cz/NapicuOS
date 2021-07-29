import { Component, NgIterable, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { Options, settings, ToolSettings } from '../interface/ToolSettings';
import { WindowItems } from '../Scripts/Type';

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
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
}
