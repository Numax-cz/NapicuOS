import {Component, Input, OnInit} from '@angular/core';
import {AppMenuInputData} from "../../interface/InputAlert";


@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent implements OnInit {
  public declare inputValue: string;
  public allowSubmit: boolean = false;
  @Input() public declare data: AppMenuInputData;

  constructor() { }

  ngOnInit(): void {
  }

  public onReject(): void {
    this.data.rejectFunction?.();
  }

  public onSubmit(): void {
      this.data.submitFunction(this.inputValue);
  }

  public onChangeInput(): void {
    this.allowSubmit = !!this.data.checkFunction?.(this.inputValue) ;
  }
}
