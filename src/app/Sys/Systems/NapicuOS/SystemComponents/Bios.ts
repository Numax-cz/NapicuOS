import {VM_COMPUTER_INFORMATION} from "../../../../Bios/vm_computer";

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







}
