import {Component, OnInit} from '@angular/core';

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


  get GetAutomaticText(): string {
    return "Automatic";
  }

  get GetDateAndTimeText(): string {
    return "Date & time"
  }

  get GetDateAndTimeFormatText(): string {
    return "Time Format"
  }

}
