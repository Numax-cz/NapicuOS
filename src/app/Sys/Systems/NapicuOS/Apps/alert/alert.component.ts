import {Component, Input, OnInit} from '@angular/core';
import {systemAlertTypeEnumMetadata} from '../../interface/Alert/alert';
import {Event} from "@angular/router";
import {log_screen_animation_time} from '../../config/logscreen';
import {ProcessWindowValueMetadata} from "../../../../Process";

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
  @Input() public declare alertType: systemAlertTypeEnumMetadata;

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * The function that is called after clicking the button
   */
  public onButtonClick(): void {
    this.windowValue.close();
  }

  /**
   * Returns the alert value
   */
  get GetAlertValue(): string {
    return this.alertContent || 'undefined alert value';
  }

  /**
   * Returns the alert type
   */
  get GetAlertType(): systemAlertTypeEnumMetadata {
    return this.alertType;
  }
}
