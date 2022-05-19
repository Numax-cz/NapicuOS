import {Component, Input, OnInit} from '@angular/core';
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";

@Component({
  selector: 'app-alert-input',
  templateUrl: './alert-input.component.html',
  styleUrls: ['./alert-input.component.scss']
})
export class AlertInputComponent implements OnInit {

  @Input() public declare data: InputAlertData;
  @Input() public declare process: Process;

  constructor() {
  }


  ngOnInit(): void {
    console.log(this.process)
  }

  public submit() {

    this.data.value = "TVOJE MAMA";
  }

}
