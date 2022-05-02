import {Component, Input, OnInit} from '@angular/core';
import {systemAlertImagesEnumMetadata} from '../../config/Alert';
import {ProcessWindowValueMetadata} from "../../SystemComponents/Process";

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
   * Value of the alert
   */
  @Input() public declare alertContent: string;
  /**
   * Type of the alert
   */
  @Input() public declare alertType: systemAlertImagesEnumMetadata;

  constructor() {
  }

  ngOnInit() {

  }

  /**
   * Returns the alert value
   */
  get GetAlertValue(): string {
    return this.alertContent || 'undefined alert value';
  }

  /**
   * Returns the alert image
   */
  get GetImage(): systemAlertImagesEnumMetadata {
    return this.alertType;
  }


  /**
   * The function that is called after clicking the button
   */
  public onButtonClick(): void {
    this.windowValue.close();
  }
}
