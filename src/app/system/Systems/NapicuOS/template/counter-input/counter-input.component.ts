import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterInputComponent),
    multi: true
  }]
})
export class CounterInputComponent implements OnInit, ControlValueAccessor  {
  val: number = 0;
  onChange: any = () => {}
  onTouch: any = () => {}

  @Input() public min: number = 0;
  @Input() public max: number = 100;




  constructor() { }

  ngOnInit(): void {
 }

  public clickMinus(): void {
    if(this.val > this.min) this.value = this.val - 1;
  }

  public clickPlus(): void {
    if(this.val < this.max) this.value = this.val + 1;
  }


  set value(val: number){
    if( val !== undefined && this.val !== val){
      this.val = val
      this.onChange(val)
      this.onTouch(val)
    }
  }

  writeValue(value: any){
    this.value = value
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }
}
