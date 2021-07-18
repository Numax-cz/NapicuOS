import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { Options, settings, ToolSettings } from '../interface/ToolSettings';

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

  get Items(): Options[] {
    return BiosComponent.WindowItems;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
}
