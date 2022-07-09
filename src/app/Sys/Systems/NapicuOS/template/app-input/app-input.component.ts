import {Component, Input, OnInit} from '@angular/core';
import {AppInputSubmitFunction, AppMenuInputData, InputAlertData, InputAppAlertData} from "../../interface/InputAlert";



@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent implements OnInit {
  public declare inputValue: string;
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

}
