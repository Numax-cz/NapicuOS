import {Component, OnInit} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../../config/UserPerms";
import {SystemTimeFormatEnumMetadata} from "../../../config/TimeFormat";
import {NapicuOS} from "../../../system.napicuos";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeAutoTimeSwitch(): void {

  }

  public GetAutoTimeSwitchA(): boolean {

    return true;
  }

  get GetDateAndTimeText(): string {
    return NapicuOS.get_language_words().other.date_and_time;
  }

  get GetDateAndTimeAutomaticText(): string {
    return NapicuOS.get_language_words().other.automatic_date_and_time;
  }

  get GetDateAndTimeFormatText(): string {
    return NapicuOS.get_language_words().other.time_format;
  }

  get GetTimeFormatOptions() {
    return Object.values(SystemTimeFormatEnumMetadata);
  }
}
