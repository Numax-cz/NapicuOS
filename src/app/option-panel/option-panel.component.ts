import { Component, OnInit } from '@angular/core';
import { BiosComponent } from '../bios/bios.component';

@Component({
  selector: 'app-option-panel',
  templateUrl: './option-panel.component.html',
  styleUrls: ['./option-panel.component.scss'],
})
export class OptionPanelComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  get FunctionOnClick(): Function {
    return function kokot() {
      alert('Click');
    };
  }

  get Items(): Array<any> {
    return BiosComponent.WindowItems;
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
}
