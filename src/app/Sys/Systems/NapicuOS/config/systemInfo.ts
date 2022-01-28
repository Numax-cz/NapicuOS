import { User } from "src/app/Sys/User";
import { SystemUserPermissionsEnumMetadata } from "../interface/User/user";


export const system_computer_name = 'napicu-os';
export const system_boot_screen_title = 'NapicuOS';
export const system_boot_screen_logo = 'assets/systems/NapicuOS/logo.webp';

export const system_root_user = new User('root', 'root', SystemUserPermissionsEnumMetadata.SuperUser);
export const system_default_user = new User('user', 'napicuos', SystemUserPermissionsEnumMetadata.User);