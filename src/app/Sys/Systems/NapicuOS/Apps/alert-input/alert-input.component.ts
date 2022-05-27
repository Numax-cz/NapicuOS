import {Component, Input, OnInit} from '@angular/core';
import {InputAlertData} from "../../interface/InputAlert";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {SystemInputAlert} from "../../SystemComponents/AlertInput";

@Component({
  selector: 'app-alert-input',
  templateUrl: './alert-input.component.html',
  styleUrls: ['./alert-input.component.scss']
})
export class AlertInputComponent implements OnInit {
  @Input() public declare data: InputAlertData;
  @Input() public declare windowValue: ProcessWindowValueMetadata;
  @Input() public declare process: Process;
  public inputValue: string = "";

  constructor() {
  }


  ngOnInit(): void {

  }

  public submit(): void {
    if (this.windowValue instanceof SystemInputAlert) {
      this.windowValue.submit(this.inputValue);
    }
    this.process.kill();
  }

  public reject(): void {
    if (this.windowValue instanceof SystemInputAlert) {
      this.windowValue.reject();
    }
    this.process.kill();
  }




  get GetValue(): string {
    return this.data.value;
  }

  get GetIcon(): string | undefined {
    return this.data.icon;
  }


}
