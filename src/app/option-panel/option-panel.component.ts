import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';
import { settings, ToolSettings } from '../interface/ToolSettings';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}
  public static MainTitle: string;
  ngOnInit(): void {}

  ngOnDestroy(): void {
    BiosComponent.WindowSelectedOption = 0;
  }

  get Items(): ToolSettings[] {
    return BiosComponent.WindowItems;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }

  get MiddleTitle(): string {
    return OptionPanelComponent.MainTitle;
  }
}
