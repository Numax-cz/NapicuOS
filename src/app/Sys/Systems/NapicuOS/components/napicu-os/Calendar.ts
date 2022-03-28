export class Calendar {
  protected readonly months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  protected readonly days: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  /**
   * The current date
   */
  protected today: Date = new Date();
  /**
   * The selected date
   */
  protected selectedMonth: Date = new Date();
  /**
   * The selected day number
   */
  protected todayNumber: number = this.selectedMonth.getDay();
  /**
   * The selected month number
   */
  protected monthNumber: number = this.selectedMonth.getMonth();
  /**
   * The selected month in string
   */
  protected monthOfToday: string = this.months[this.monthNumber];


  protected firstDayOfMonth = new Date(this.selectedMonth.getFullYear(), this.monthNumber, 1);
  protected lastDayOfMonth = new Date(this.selectedMonth.getFullYear(), this.monthNumber + 1, 0);

  protected numberDaysOfMonth = this.lastDayOfMonth.getDate();


  /**
   * Data to be displayed in the calendar
   */
  public data: number[][] = [[]]


  /**
   * Update the calendar
   */
  public update(): void {
    for (let i = 1; i <= this.numberDaysOfMonth; i++) {
      let iDay = new Date(this.selectedMonth.getFullYear(), this.monthNumber, i);
      if (this.days[iDay.getDay() ? iDay.getDay() - 1 : 6] == this.days[0]) {
        this.data.push([]);
      }
      this.data[this.data.length - 1].push(iDay.getDate());
    }

    if (this.lastDayOfMonth.getDay() != 0) {
      for (let i = 0; i <= 6; i++) {
        let aDay = new Date(this.selectedMonth.getFullYear(), this.monthNumber + 1, i).getDay();
        if (aDay !== 0 && aDay >= this.lastDayOfMonth.getDay()) {
          this.data[this.data.length - 1].push(i + 1);

        }
      }
    }

  }
  
}
