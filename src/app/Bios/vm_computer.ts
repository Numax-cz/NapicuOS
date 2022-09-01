import {NapicuOS} from "../Sys/Systems/NapicuOS/system.napicuos";
import {VM_COMPUTER_INFORMATION_METADATA} from "./interface/BiosInfo";

export const VM_COMPUTER_INFORMATION: VM_COMPUTER_INFORMATION_METADATA = {
  cpu: "AMD Celeron (tm) II B45 Processor @ 2.6 GHz (64bit)",
  gpu: "ATI HD 4090 TI",
  cpu_speed: "2666MHz",
  cache_size: "8192KB",
  mem_size: "8192MB",
  serial_number: "HRV54JFKD54FJ34FJfj333",

  drives: [
    {
      capacity: "0.0075GB",
      title: 'IBM 1405',
      data: {},
    },
    {
      capacity: "0.021GB",
      title: 'Seagate ST-225 0.021GB',
      data: {},
    },
    {
      capacity: "69GB",
      title: 'Samsung 860 EVO M.2',
      data: {
        system: [new NapicuOS()],
      },
    },
  ]
}
