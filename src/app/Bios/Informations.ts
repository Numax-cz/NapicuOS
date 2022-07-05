import {Informations} from './interface/Informations';
import {lang} from './Config/BiosMenuList';
import {VM_COMPUTER_INFORMATION} from "./vm_computer";

export function BiosMainInformation(): Informations[] {
  return [
    {
      title: lang.MainInfoTitle.cpu_type,
      value: VM_COMPUTER_INFORMATION.cpu,
    },
    {
      title: lang.MainInfoTitle.cpu_speed,
      value: VM_COMPUTER_INFORMATION.cpu_speed,
    },
    {
      title: lang.MainInfoTitle.cache_size,
      value: VM_COMPUTER_INFORMATION.cache_size,
    },
    {
      title: lang.MainInfoTitle.memory_size,
      value: VM_COMPUTER_INFORMATION.mem_size,
    },
    {
      title: lang.MainInfoTitle.se_number,
      value: VM_COMPUTER_INFORMATION.serial_number,
    },
  ];
}
