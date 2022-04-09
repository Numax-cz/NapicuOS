import {NapicuCalendarDateMetadata} from "../interface/Calendar/calendar";

export class NapicuCalendar {
  /**
   * The current date
   */
  protected today: Date = new Date();
  /**
   * The selected date
   */
  protected declare selectedMonth: Date;
  /**
   * The selected day number
   */
  protected declare todayNumber: number;
  /**
   * The selected month number
   */
  protected declare monthNumber: number;
  /**
   * The first day of the month
   */
  protected declare firstDayOfMonth: Date;
  /**
   * The last day of the month
   */
  protected declare lastDayOfMonth: Date;
  /**
   * The number of days in the month
   */
  protected declare numberDaysOfMonth: number;
  /**
   * Data to be displayed in the calendar
   */
  public data: NapicuCalendarDateMetadata[][] = [[]];


  constructor(year?: number, month?: number) {
    this.selectedMonth = (year && month) ? new Date(year, month, 1) : new Date();

    this.todayNumber = this.selectedMonth.getDay();
    this.monthNumber = this.selectedMonth.getMonth();

    this.firstDayOfMonth = new Date(this.selectedMonth.getFullYear(), this.monthNumber, 1);
    this.lastDayOfMonth = new Date(this.selectedMonth.getFullYear(), this.monthNumber + 1, 0);

    this.numberDaysOfMonth = this.lastDayOfMonth.getDate();

    //Days of the previous month
    if (this.firstDayOfMonth.getDay() !== 1) {
      let beforeMonthDays: number = new Date(this.selectedMonth.getFullYear(), this.monthNumber, 0).getDate();
      for (let i = 6; i >= 0; i--) {
        let bDay = new Date(this.selectedMonth.getFullYear(), this.monthNumber - 1, beforeMonthDays - i).getDay();
        if (bDay !== 0 && bDay < (this.firstDayOfMonth.getDay() ? this.firstDayOfMonth.getDay() : 7)) {
          this.data[0].unshift({day: beforeMonthDays - i, outOfMonth: true});
        }
      }
    }

    //Days of the current month
    for (let i = 1; i <= this.numberDaysOfMonth; i++) {
      let iDay = new Date(this.selectedMonth.getFullYear(), this.monthNumber, i);
      if (iDay.getDay() == 1) {
        this.data.push([]);
      }
      this.data[this.data.length - 1].push({day: iDay.getDate(), outOfMonth: false});
    }

    //Days of the next month
    if (this.lastDayOfMonth.getDay() != 0) {
      for (let i = 0; i <= 6; i++) {
        let aDay = new Date(this.selectedMonth.getFullYear(), this.monthNumber + 1, i).getDay();
        if (aDay !== 0 && aDay >= this.lastDayOfMonth.getDay()) {
          this.data[this.data.length - 1].push({day: i + 1, outOfMonth: true});
        }
      }
    }
  }
}
