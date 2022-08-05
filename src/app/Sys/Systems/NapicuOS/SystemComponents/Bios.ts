import {VM_COMPUTER_INFORMATION} from "../../../../Bios/vm_computer";
import {Current} from "../../../../Bios/Config/FlashInformationData";
import {BiosOptionsST, BiosSettings} from "../../../../Bios/ToolSettings";
import {Time, Date} from "../../../../Bios/interface/ToolSettings";
import {SystemTimeFormatEnumMetadata} from "../config/TimeFormat";
import {DateInterface, TimeInterface} from "../interface/Date";

export class NapicuBios{




  public static get_bios_time(): TimeInterface<string>{
    let time: Time[] = BiosSettings["Main"].settings["time"]?.time || []
    return {
      seconds: time[0].title,
      minutes: time[1].title,
      hours: time[2].title
    };
  }

  public static get_bios_time_int(): TimeInterface<number>{
    let time: TimeInterface<string> = this.get_bios_time();
    return {
      seconds: Number(time.seconds),
      minutes: Number(time.minutes),
      hours: Number(time.hours)
    };
  }

  public static get_bios_date(): DateInterface<string>{
    let date: Date[] = BiosSettings["Main"].settings["date"]?.date || [];
    return {
      day: date[0].title,
      month: date[1].title,
      year: date[2].title
    }
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
