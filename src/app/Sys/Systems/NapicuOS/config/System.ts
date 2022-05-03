import {SystemVariable} from "../interface/System";

export const SYSTEM_DEFAULT_HOSTNAME = 'napicu-os';
export const SYSTEM_BOOT_SCREEN_TITLE = 'NapicuOS';
export const SYSTEM_BOOT_SCREEN_LOGO = 'assets/systems/NapicuOS/logo.webp';
export const SYSTEM_WALLPAPER = '/assets/systems/NapicuOS/NapicuOSWallpaper2.webp';

export const SYSTEM_USERS_MIN_LENGTH = 1;
export const SYSTEM_USERS_MAX_LENGTH = 10;
export const SYSTEM_USERS_MIN_PASSWORD_LENGTH = 4;
export const SYSTEM_USERS_MAX_PASSWORD_LENGTH = 10;

export const SYSTEM_HOSTNAME_MIN_LENGTH = 1;
export const SYSTEM_HOSTNAME_MAX_LENGTH = 10;


export const SYSTEM_DEFAULT_TERMINAL_PATH = `/home`; //TODO user


export const SYSTEM_SOUNDS = {
  InterfaceSelect: 'assets/sound/InterfaceSelect.mp3',
  InterfaceStart: 'assets/sound/InterfaceStart.mp3',
  LongPop: 'assets/sound/LongPop.mp3',
  ShortPop: 'assets/sound/ShortPop.mp3',
};
