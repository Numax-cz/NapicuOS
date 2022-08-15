import {Component, OnInit} from '@angular/core';
import {SystemTimeFormatEnumMetadata} from "../../../config/TimeFormat";
import {NapicuOS} from "../../../system.napicuos";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public setTimeSettingMenuDisplayed: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }


  public openSetTimeSettingsMenu = (): void => {
    this.setTimeSettingMenuDisplayed = true;
  }

  public closeSetTimeSettingsMenu = (): void => {
    this.setTimeSettingMenuDisplayed = false;
  }

  public onChangeAutoTimeSwitch(): void {
    NapicuOS.switch_active_user_time_sync();
  }

  public onChangeTimeFormat(value: number): void {
    NapicuOS.set_user_time_format(NapicuOS.get_active_user_username(), value);
  }

  get GetAutoTimeSwitchA(): boolean {
    return NapicuOS.get_active_user_time_sync();
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

  get GetSelectedTimeFormat(){
    return NapicuOS.get_active_user_time_format_index();
  }

  get GetTimeFormatOptions() {
    return Object.values(SystemTimeFormatEnumMetadata);
  }

  get GetDayText(): string{
    return NapicuOS.get_language_words().Date.day;
  }

  get GetMonthText(): string {
    return NapicuOS.get_language_words().Date.month;
  }

  get GetYearText(): string {
    return NapicuOS.get_language_words().Date.year;
  }
}
