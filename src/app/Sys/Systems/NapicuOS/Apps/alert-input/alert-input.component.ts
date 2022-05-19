import {Component, Input, OnInit} from '@angular/core';
import {InputAlertData} from "../../interface/InputAlert";

@Component({
  selector: 'app-alert-input',
  templateUrl: './alert-input.component.html',
  styleUrls: ['./alert-input.component.scss']
})
export class AlertInputComponent implements OnInit {

  @Input() public declare data: InputAlertData;


  constructor() {
  }


  ngOnInit(): void {
  }


}
