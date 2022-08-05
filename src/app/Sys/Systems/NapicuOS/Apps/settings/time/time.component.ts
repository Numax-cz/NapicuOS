import {Component, OnInit} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../../config/UserPerms";
import {SystemTimeFormatEnumMetadata} from "../../../config/TimeFormat";
import {NapicuOS} from "../../../system.napicuos";
import {NapicuOSComponent} from "../../../components/napicu-os/napicu-os.component";

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
    NapicuOS.set_system_time_sync(!NapicuOS.get_system_time_sync());

  }

  public onChangeTimeFormat(value: number): void {
    NapicuOS.set_system_time_format(value)
  }

  get GetAutoTimeSwitchA(): boolean {
    return NapicuOS.get_system_time_sync();
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
    return NapicuOS.get_system_time_format_index();
  }

  get GetTimeFormatOptions() {
    return Object.values(SystemTimeFormatEnumMetadata);
  }
}
