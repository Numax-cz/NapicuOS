import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}
  public static FastOption: boolean = false;
  ngOnInit(): void {}

  get Items(): Array<any> {
    return BiosComponent.WindowItems;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
  get FastOption(): boolean {
    return OptionPanelComponent.FastOption;
  }
}
