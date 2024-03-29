import {VM_COMPUTER_INFORMATION} from "../../../../bios/vm_computer";
import {Current} from "../../../../bios/config/FlashInformationData";
import {BiosSettings} from "../../../../bios/ToolSettings";
import {BiosDate, BiosTime} from "../../../../bios/interface/ToolSettings";
import {DateInterface, TimeInterface} from "../interface/Date";
import {Save} from "../../../../bios/Scripts/exit/SaveChanges";
import {NapicuDate} from "napicuformatter";
import {VM_COMPUTER_DRIVES_METADATA} from "../../../../bios/interface/SystemDrives";

export class NapicuBios{

  protected static declare biosTime_Date: Date;
  protected static declare biosTime_cache: number;

  public static get_bios_time(): TimeInterface<string>{
    let time: BiosTime[] = BiosSettings["Main"].settings["time"]?.time || []
    return {
      hours: time[0].title,
      minutes: time[1].title,
      seconds: time[2].title
    };
  }

  public static get_bios_time_int(): TimeInterface<number>{
    let time: TimeInterface<string> = this.get_bios_time();
    return {
      hours: Number(time.hours),
      minutes: Number(time.minutes),
      seconds: Number(time.seconds),
    };
  }

  public static get_bios_date(): DateInterface<string>{
    let date: BiosDate[] = BiosSettings["Main"].settings["date"]?.date || [];
    return {
      month: date[0].title,
      day: date[1].title,
      year: date[2].title,
    }
  }

  public static set_bios_time(time: TimeInterface<number>){
    let s =  BiosSettings["Main"].settings["time"].time;
    if(!s) return;
    s[0].title = String(time.hours);
    s[1].title = String(time.minutes);
    s[2].title = String(time.seconds);
    this.load_time();
    Save();
  }

  public static set_bios_date(date: DateInterface<number>){
    let s =  BiosSettings["Main"].settings["date"].date;
    if(!s) return;
    s[0].title = String(date.month);
    s[1].title = String(date.day);
    s[2].title = String(date.year);
    this.load_time();
    Save();
  }

  public static set_bios_time_hour(value :number): void {
    let s =  BiosSettings["Main"].settings["time"].time;
    if(!s) return;
    s[0].title = String(value);
    this.load_time();
    Save();
  }

  public static set_bios_time_minute(value: number): void {
    let s =  BiosSettings["Main"].settings["time"].time;
    if(!s) return;
    s[1].title = String(value);
    this.load_time();
    Save();
  }

  public static set_bios_time_seconds(value: number): void {
    let s =  BiosSettings["Main"].settings["time"].time;
    if(!s) return;
    s[2].title = String(value);
    this.load_time();
    Save();
  }

  public static set_bios_date_month(value: number): void {
    let s =  BiosSettings["Main"].settings["date"].date;
    if(!s) return;
    s[0].title = String(value);
    this.load_time();
    Save();
  }

  public static set_bios_date_day(value: number): void {
    let s =  BiosSettings["Main"].settings["date"].date;
    if(!s) return;
    s[1].title = String(value);
    this.load_time();
    Save();
  }

  public static set_bios_date_year(value :number): void {
    let s =  BiosSettings["Main"].settings["date"].date;
    if(!s) return;
    s[2].title = String(value);
    this.load_time();
    Save();
  }

  public static get_bios_time_napicu_date_format(): NapicuDate{
    if(!this.biosTime_Date || !this.biosTime_cache) this.load_time();

    let timestamp: number = (new Date().getTime() - (this.biosTime_cache - this.biosTime_Date.getTime()));
    let napicuDate: NapicuDate = new NapicuDate(timestamp);


    //TODO make better lol
    NapicuBios.set_bios_date({
      year: napicuDate.getCurrentYear(),
      month: napicuDate.getCurrentMonth() - 1,
      day: napicuDate.getCurrentDate()
    });

    NapicuBios.set_bios_time({
      hours: napicuDate.getCurrentHours(),
      minutes: napicuDate.getCurrentMinutes(),
      seconds: napicuDate.getCurrentSeconds()
    });

    return new NapicuDate(napicuDate.getCurrentYear(), napicuDate.getCurrentMonth() - 1, napicuDate.getCurrentDate(), napicuDate.getCurrentHours(), napicuDate.getCurrentMinutes(), napicuDate.getCurrentSeconds(), 0);
  }


  public static get_bios_date_int(): DateInterface<number>{
    let date: DateInterface<string> = this.get_bios_date();
    return {
      day: Number(date.day),
      month: Number(date.month),
      year: Number(date.year)
    }
  }

  public static load_time(): void {
    const time: TimeInterface<number> = this.get_bios_time_int();
    const date: DateInterface<number> = this.get_bios_date_int();
    this.biosTime_Date = new Date(date.year, date.month, date.day, time.hours, time.minutes, time.seconds, 0);
    this.biosTime_cache = new Date().getTime();
  }

  public static get_drives(): VM_COMPUTER_DRIVES_METADATA[]{
    return VM_COMPUTER_INFORMATION.drives;
  }

  public static get_selected_drive(): VM_COMPUTER_DRIVES_METADATA{
    return VM_COMPUTER_INFORMATION.drives[BiosSettings["Boot"].settings["boot_priority"].selected]
  }

  public static get_cpu_name(): string {
    return VM_COMPUTER_INFORMATION.cpu;
  }

  public static get_gpu_name(): string {
    return VM_COMPUTER_INFORMATION.gpu
  }

  public static get_cpu_speed(): string {
    return VM_COMPUTER_INFORMATION.cpu_speed;
  }

  public static get_cache_size(): string {
    return VM_COMPUTER_INFORMATION.cache_size;
  }

  public static get_mem_size(): string {
    return VM_COMPUTER_INFORMATION.mem_size;
  }

  public static get_serial_number(): string {
    return VM_COMPUTER_INFORMATION.serial_number;
  }

  public static get_bios_version(): string {
    return Current.ver;
  }

  public static get_board_model(): string{
    return Current.board;
  }

  public static get_bios_version_date(): string{
    return Current.date;
  }
}
