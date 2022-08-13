import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss']
})
export class CounterInputComponent implements OnInit {


  @Input() public min: number = 0;
  @Input() public max: number = 100;
  @Input() public value: number = 0;
  @Input() public declare onUpdate: () => void;

  constructor() { }

  ngOnInit(): void {
  }

  public clickMinus(): void {
    if(this.value > this.min) this.value--;
  }

  public clickPlus(): void {
    if(this.value < this.max) this.value++;
  }
}
