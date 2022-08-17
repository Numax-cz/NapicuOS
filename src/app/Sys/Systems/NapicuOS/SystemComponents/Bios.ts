import {VM_COMPUTER_INFORMATION} from "../../../../Bios/vm_computer";
import {Current} from "../../../../Bios/Config/FlashInformationData";
import {BiosSettings} from "../../../../Bios/ToolSettings";
import {BiosDate, BiosTime} from "../../../../Bios/interface/ToolSettings";
import {DateInterface, TimeInterface} from "../interface/Date";
import {NapicuDate} from "napicuformatter";
import {Save} from "../../../../Bios/Scripts/exit/SaveChanges";

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

  public static  set_bios_time(time: TimeInterface<number>){
    let s =  BiosSettings["Main"].settings["time"].time;
    if(!s) return;
    s[0].title = String(time.hours);
    s[1].title = String(time.minutes);
    s[2].title = String(time.seconds);
    Save();
  }

  public static get_bios_date(): DateInterface<string>{
    let date: BiosDate[] = BiosSettings["Main"].settings["date"]?.date || [];
    return {
      month: date[0].title,
      day: date[1].title,
      year: date[2].title,
    }
  }

  public static set_bios_date(date: DateInterface<number>){
   let s =  BiosSettings["Main"].settings["date"].date;
    if(!s) return;
    s[0].title = String(date.month);
    s[1].title = String(date.day);
    s[2].title = String(date.year);
    Save();
  }

  public static get_bios_time_napicu_date_format(): NapicuDate{
    const time: TimeInterface<number> = this.get_bios_time_int();
    const date: DateInterface<number> = this.get_bios_date_int();

    if(!this.biosTime_Date || !this.biosTime_cache) {
      this.biosTime_Date = new Date(date.year, date.month, date.day, time.hours, time.minutes, time.seconds, 0);
      this.biosTime_cache = new Date().getTime();
    }

    let timestamp: number = new Date().getTime() - (this.biosTime_cache - this.biosTime_Date.getTime());
    let napicuDate = new NapicuDate(timestamp);

    NapicuBios.set_bios_date({
      year: napicuDate.getCurrentYear(),
      month: napicuDate.getCurrentMonth(),
      day: napicuDate.getCurrentDate()
    });

    NapicuBios.set_bios_time({
      hours: napicuDate.getCurrentHours(),
      minutes: napicuDate.getCurrentMinutes(),
      seconds: napicuDate.getCurrentSeconds()
    });


    return napicuDate;
  }


  public static get_bios_date_int(): DateInterface<number>{
    let date: DateInterface<string> = this.get_bios_date();
    return {
      day: Number(date.day),
      month: Number(date.month),
      year: Number(date.year)
    }
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
