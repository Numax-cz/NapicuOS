import {VM_COMPUTER_INFORMATION} from "../../../../Bios/vm_computer";
import {Current} from "../../../../Bios/Config/FlashInformationData";

export class NapicuBios{

  public static get_cpu_name(): string {
    return VM_COMPUTER_INFORMATION.cpu;
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
