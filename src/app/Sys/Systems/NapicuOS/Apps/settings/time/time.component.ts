import {Component, OnInit} from '@angular/core';
import {SystemTimeFormatEnumMetadata} from "../../../config/TimeFormat";
import {NapicuOS} from "../../../system.napicuos";
import {DATE_MAX_YEAR, DATE_MIN_YEAR} from "../../../../../../Bios/Config/MaxDate";
import {daysInMonth} from "../../../scripts/DaysInMonth";
import {GET_SYSTEM_BASIC_TIME_FORMAT} from "../../../config/Time";
import {SYSTEM_SETTINGS_TIME_DEFAULT_FOMRAT} from "../../../config/Apps/settings/time/config";
import {NapicuBios} from "../../../SystemComponents/Bios";
import {SettingsComponent} from "../settings.component";

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent implements OnInit {

  public setTimeSettingMenuDisplayed: boolean = false;

  public readonly max_year: number = DATE_MAX_YEAR;
  public readonly min_year: number = DATE_MIN_YEAR;

  public selectedDay: number = this.GetDate;
  public selectedMonth: number = this.GetMonth;
  public selectedYear: number = this.GetYear;


  constructor() { }

  ngOnInit(): void {
  }


  public addMinute = (): void => NapicuBios.set_bios_time_minute(NapicuBios.get_bios_time_int().minutes + 1);

  public removeMinute = (): void => NapicuBios.set_bios_time_minute(NapicuBios.get_bios_time_int().minutes - 1)

  public addHour = (): void  => NapicuBios.set_bios_time_hour(NapicuBios.get_bios_time_int().hours + 1);

  public removeHour = (): void => NapicuBios.set_bios_time_hour(NapicuBios.get_bios_time_int().hours - 1);

  public updateDay = (): void => NapicuBios.set_bios_date_day(this.selectedDay);

  public updateMonth = (): void => NapicuBios.set_bios_date_month(this.selectedMonth);

  public updateYear = (): void => NapicuBios.set_bios_date_year(this.selectedYear);

  public changeTimeFormat (): void  {
    let tf = NapicuOS.get_active_user_time_format_AM_PM();
    if(tf === "PM") NapicuBios.set_bios_time_hour(NapicuBios.get_bios_time_int().hours - 12);
    else NapicuBios.set_bios_time_hour(NapicuBios.get_bios_time_int().hours + 12);
  }

  get GetUserTimeFormatText(): string{
    return NapicuOS.get_active_user_time_format_AM_PM();
  }

  get GetUserTimeFormat12h(): boolean {
    return NapicuOS.get_active_user_time_format() == SystemTimeFormatEnumMetadata.h12
  }

  public SetSelectedDay(value: number): void {
    this.selectedDay = value;
  }

  public openSetTimeSettingsMenu = (): void => {
    this.setTimeSettingMenuDisplayed = true;
    SettingsComponent.disableEvent();
  }

  public closeSetTimeSettingsMenu = (): void => {
    this.setTimeSettingMenuDisplayed = false;
    SettingsComponent.allowEvent();

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

  get GetDate(): number{
    return NapicuOS.getTime().getCurrentDate();
  }

  get GetMaxDate(): number {
    return daysInMonth(this.selectedYear, this.selectedMonth);
  }

  get GetMonth(): number{
    return NapicuOS.getTime().getCurrentMonth();
  }

  get GetYear(): number{
    return NapicuOS.getTime().getCurrentYear();
  }

  get GetTimeSettingsTimeTemplate(): string {
    return NapicuOS.getTime().format(GET_SYSTEM_BASIC_TIME_FORMAT(NapicuOS.get_active_user_time_format()));
  }

  get GetTimeDateSettingsTemplateTime(): string{
    return NapicuOS.getTime().format(SYSTEM_SETTINGS_TIME_DEFAULT_FOMRAT(NapicuOS.get_active_user_time_format()));
  }

  get GetMonthText(): string {
    return NapicuOS.get_language_words().Date.month;
  }

  get GetYearText(): string {
    return NapicuOS.get_language_words().Date.year;
  }
}
