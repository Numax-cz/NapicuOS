import {Component, Input, OnInit} from '@angular/core';
import {systemAlertImagesEnumMetadata} from '../../config/Alert';
import {ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {AlertData} from "../../interface/Alert";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  /**
   * Window of the alert
   */
  @Input() public declare windowValue: ProcessWindowValueMetadata;

  /**
   * Alert data
   */
  @Input() public declare data: AlertData;

  constructor() {
  }

  ngOnInit() {

  }

  /**
   * Returns the alert value
   */
  get GetAlertValue(): string {
    return this.data.value || 'undefined alert value';
  }

  /**
   * Returns the alert image
   */
  get GetImage(): systemAlertImagesEnumMetadata {
    return this.data.type;
  }


  /**
   * The function that is called after clicking the button
   */
  public onButtonClick(): void {
    this.windowValue.close();
  }
}
