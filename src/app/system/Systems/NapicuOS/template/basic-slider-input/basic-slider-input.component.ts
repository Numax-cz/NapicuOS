import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic-slider-input',
  templateUrl: './basic-slider-input.component.html',
  styleUrls: ['./basic-slider-input.component.scss']
})
export class BasicSliderInputComponent implements OnInit {

  @Input() public declare value: number;
  @Input() public min: number = 0;
  @Input() public max: number = 100;
  @Input() public step: number = 5;
  @Input() public declare onUpdate: () => void;

  constructor() { }

  ngOnInit(): void {
  }

  public ngOnUpdate(): void {
   this.onUpdate?.();
  }
}
