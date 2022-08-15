import {Loading} from '../LoadingAnimations';
import {boot_configuration} from "../../Config/bootloader";

export function Reboot(): void {
  Loading('/',boot_configuration.startTimeOut, boot_configuration.startTimeIn);
}
