import {SystemInformation} from "../interface/System";

export const SYSTEM_DEFAULT_HOSTNAME = 'napicu-os';
export const SYSTEM_BOOT_SCREEN_TITLE = 'NapicuOS';
export const SYSTEM_BOOT_SCREEN_LOGO = 'assets/systems/NapicuOS/logo.webp';
export const SYSTEM_WALLPAPER = '/assets/systems/NapicuOS/NapicuOSWallpaper2.webp';

export const SYSTEM_INFORMATION: SystemInformation = {
  name: "NapicuOS",
  type: "64-bit",
  ver: "preview-0.22",
}

export const SYSTEM_USERS_MIN_LENGTH = 1;
export const SYSTEM_USERS_MAX_LENGTH = 10;
export const SYSTEM_USERS_MIN_PASSWORD_LENGTH = 4;
export const SYSTEM_USERS_MAX_PASSWORD_LENGTH = 10;

export const SYSTEM_HOSTNAME_MIN_LENGTH = 1;
export const SYSTEM_HOSTNAME_MAX_LENGTH = 10;


export const SYSTEM_DEFAULT_TERMINAL_PATH = `/home`; //TODO user

export const SYSTEM_FILE_NAME_REGEX = /^[a-zA-Z0-9_\-\.]+$/;

export enum SYSTEM_SOUNDS {
  InterfaceSelect = 'assets/sound/InterfaceSelect.mp3',
  InterfaceStart = 'assets/sound/InterfaceStart.mp3',
  LongPop = 'assets/sound/LongPop.mp3',
  ShortPop = 'assets/sound/ShortPop.mp3',
}

export enum SYSTEM_IMAGES {
  //Apps - Alert icons
  Close = 'assets/systems/NapicuOS/SystemIcons/apps/Alert/close.png',
  Info = 'assets/systems/NapicuOS/SystemIcons/apps/Alert/info.png',
  Success = 'assets/systems/NapicuOS/SystemIcons/apps/Alert/success.png',
  Warning = 'assets/systems/NapicuOS/SystemIcons/apps/Alert/warning.png',

  //Apps - Bird
  bird = "assets/systems/NapicuOS/SystemIcons/apps/Bird/bird.png",
  pipe = "assets/systems/NapicuOS/SystemIcons/apps/Bird/pipe.png",

  //XFD icons
  FileCommander = 'assets/systems/NapicuOS/SystemIcons/XFD/commander.svg',
  Info2 = 'assets/systems/NapicuOS/SystemIcons/XFD/info.svg',
  Internet = 'assets/systems/NapicuOS/SystemIcons/XFD/internet.svg',
  Menu = 'assets/systems/NapicuOS/SystemIcons/XFD/menu.svg',
  Monitor = 'assets/systems/NapicuOS/SystemIcons/XFD/monitor.svg',
  Notification = 'assets/systems/NapicuOS/SystemIcons/XFD/notification.webp',
  Term = 'assets/systems/NapicuOS/SystemIcons/XFD/term.svg',
  User = "assets/systems/NapicuOS/SystemIcons/XFD/user.png",
  AppAudio = "assets/systems/NapicuOS/SystemIcons/XFD/application-audio.svg",
  AppDocBlank = "assets/systems/NapicuOS/SystemIcons/XFD/application-blank.svg",
  AppDocText = "assets/systems/NapicuOS/SystemIcons/XFD/application-document-blank.svg",
  AudioVolumeHigh = "assets/systems/NapicuOS/SystemIcons/XFD/audio-volume-high-panel.svg",
  AudioVolumeLow = "assets/systems/NapicuOS/SystemIcons/XFD/audio-volume-low.svg",
  AvatarDefault = "assets/systems/NapicuOS/SystemIcons/XFD/avatar-default.svg",
  BlueFolder = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue.svg",
  BlueFolderImg = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-img.svg",
  BlueFolderHome = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-home.svg",
  Trash = "assets/systems/NapicuOS/SystemIcons/XFD/trash.svg",
  Computer = "assets/systems/NapicuOS/SystemIcons/XFD/computer.svg",
  settings_blue = "assets/systems/NapicuOS/SystemIcons/XFD/settings-blue.svg",
  Drive = "assets/systems/NapicuOS/SystemIcons/XFD/drive.svg",
  BlueFolderDocuments = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-doc.svg",
  BlueFolderDownloads = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-downloads.svg",
  BlueFolderMusic = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-music.svg",
  BlueFolderPictures = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-pictures.svg",
  BlueFolderVideos = "assets/systems/NapicuOS/SystemIcons/XFD/folder-blue-video.svg",
  BlueUser = "assets/systems/NapicuOS/SystemIcons/XFD/blue-user.svg",
  ArrowUp = "assets/systems/NapicuOS/SystemIcons/XFD/arrow-up.svg",
  ArrowRight = "assets/systems/NapicuOS/SystemIcons/XFD/arrow-right.svg",
  ArrowLeft = "assets/systems/NapicuOS/SystemIcons/XFD/arrow-left.svg",
  ArrowDown = "assets/systems/NapicuOS/SystemIcons/XFD/arrow-down.svg",
  Home = "assets/systems/NapicuOS/SystemIcons/XFD/home.svg",
  addFile = "assets/systems/NapicuOS/SystemIcons/XFD/addFile.svg",
  addFolder = "assets/systems/NapicuOS/SystemIcons/XFD/addFolder.svg",
  lock = "assets/systems/NapicuOS/SystemIcons/XFD/lock.svg",
  settings = "assets/systems/NapicuOS/SystemIcons/XFD/settings.svg",
  shutdown = "assets/systems/NapicuOS/SystemIcons/XFD/shutdown.svg",
  paint = "assets/systems/NapicuOS/SystemIcons/XFD/paint.svg",

}

export const SYSTEM_DEFAULT_HOME_FOLDERS: string[] = [
  "Desktop", "Documents", "Downloads", "Music", "Pictures", "Videos", "Downloads"
]
