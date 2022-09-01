import {NapicuOS} from "../../Sys/Systems/NapicuOS/system.napicuos";
import {VM_COMPUTER_DRIVES_METADATA} from "./SystemDrives";

export interface BiosIf {
  title: string;
  version: string;
  date: string;
}



export interface VM_COMPUTER_INFORMATION_METADATA{
  cpu: string
  gpu: string,
  cpu_speed: string,
  cache_size: string,
  mem_size: string,
  serial_number: string,

  drives: VM_COMPUTER_DRIVES_METADATA[]
}
