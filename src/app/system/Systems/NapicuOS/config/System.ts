import {SystemInformation} from "../interface/System";
import {SystemTimeFormatEnumMetadata} from "./TimeFormat";
import {SystemUserPermissionsEnumMetadata} from "./UserPerms";
import {UserConstructorMetadata} from "../interface/User/User";
import {NapicuOsCookiesTemplate} from "../interface/Cookies";

export const SYSTEM_DEFAULT_HOSTNAME = 'napicu-os';
export const SYSTEM_BOOT_SCREEN_TITLE = 'NapicuOS';
export const SYSTEM_BOOT_SCREEN_LOGO = 'assets/systems/NapicuOS/logo.webp';

export const SYSTEM_DEFAULT_COOKIES_ARRAY: NapicuOsCookiesTemplate = {
  user: {
    activeUser: null,
      users: []
  },
  hostname: SYSTEM_DEFAULT_HOSTNAME,
    directors: [],
    files: [],
    firstRun: true
};

export const SYSTEM_INFORMATION: SystemInformation = {
  name: "NapicuOS",
  type: "64-bit",
  ver: "1.3.1",
}

export const SYSTEM_ROOT_USER: UserConstructorMetadata = {
  username: 'root',
  password: 'root',
  permissions: SystemUserPermissionsEnumMetadata.SuperUser,
  autoAuth: true
}

export const SYSTEM_DEFAULT_TEST_USER: UserConstructorMetadata = {
  username: 'user',
  password: 'napicuos',
  permissions: SystemUserPermissionsEnumMetadata.User
}

export const SYSTEM_USERS_MIN_LENGTH = 1;
export const SYSTEM_USERS_MAX_LENGTH = 10;
export const SYSTEM_USERS_MIN_PASSWORD_LENGTH = 4;
export const SYSTEM_USERS_MAX_PASSWORD_LENGTH = 10;

export const SYSTEM_HOSTNAME_MIN_LENGTH = 1;
export const SYSTEM_HOSTNAME_MAX_LENGTH = 10;

export const SYSTEM_DEFAULT_TIME_FORMAT = SystemTimeFormatEnumMetadata.h12;

export const SYSTEM_DEFAULT_TERMINAL_PATH = `/home`; //TODO user

export const SYSTEM_FILE_NAME_REGEX = /^[a-zA-Z0-9_\-\.]+$/;

export const SYSTEM_USERNAME_REGEX = /^[a-zA-Z\-]+$/;

export enum SYSTEM_SOUNDS {
  InterfaceSelect = 'assets/sound/InterfaceSelect.mp3',
  InterfaceStart = 'assets/sound/InterfaceStart.mp3',
  LongPop = 'assets/sound/LongPop.mp3',
  ShortPop = 'assets/sound/ShortPop.mp3',
  FlappyJump = "assets/sound/Apps/Bird/Jump.wav",
  FlappyGameOver = "assets/sound/Apps/Bird/GameOver.wav"
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
  //Apps - Weather
  weatherBackground = "assets/systems/NapicuOS/SystemIcons/apps/Weather/weatherBackground.jpg",

  //XFD icons
  FileCommander = 'assets/systems/NapicuOS/SystemIcons/XFD/commander.svg',
  Info2 = 'assets/systems/NapicuOS/SystemIcons/XFD/symbols/info.svg',
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
  time = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/time.svg",
  users = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/users.svg",
  user = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/user.svg",
  pencil = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/pencil.svg",
  photo = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/photo.svg",
  calculator = "assets/systems/NapicuOS/SystemIcons/XFD/calculator.svg",
  browser = "assets/systems/NapicuOS/SystemIcons/XFD/browser.svg",
  map = "assets/systems/NapicuOS/SystemIcons/XFD/map.svg",
  weather = "assets/systems/NapicuOS/SystemIcons/XFD/weather.svg",
  language = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/lang.svg",
  usaFlag = "assets/systems/NapicuOS/SystemIcons/XFD/united-states.webp",
  czechFlag = "assets/systems/NapicuOS/SystemIcons/XFD/czech-republic.webp",
  brush = "assets/systems/NapicuOS/SystemIcons/XFD/symbols/brush.svg",
  github = "assets/systems/NapicuOS/github.png",
  angular = "assets/systems/NapicuOS/angular.svg",
  menu = "assets/systems/NapicuOS/SystemIcons/XFD/menu.svg",
  pong = "assets/systems/NapicuOS/SystemIcons/XFD/ping-pong.webp",
  keyboard = "assets/systems/NapicuOS/SystemIcons/XFD/keyboard.svg",

}

export enum SYSTEM_WALLPAPERS  {
  // default_wallpaper = "/assets/systems/NapicuOS/NapicuOSWallpaper2.webp",
  default_wallpaper  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-11405712.webp",
  wallpaper_1  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-3418457.webp",
  wallpaper_2  = "assets/systems/NapicuOS/wallpapers/pexels-alina-blumberg-5908235.webp",
  wallpaper_3  = "assets/systems/NapicuOS/wallpapers/pexels-edward-jenner-4252893.webp",
  wallpaper_4  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-2832382.webp",
  wallpaper_5  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-13069595.webp",
  wallpaper_6  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-2457290.webp",
  wallpaper_7  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-4175054.webp",
  wallpaper_8  = "assets/systems/NapicuOS/wallpapers/pexels-steve-johnson-1517077.webp",
  wallpaper_9  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-8152447.webp",
  wallpaper_10  = "assets/systems/NapicuOS/wallpapers/pexels-anni-roenkae-4175070.webp",
  wallpaper_11  = "assets/systems/NapicuOS/wallpapers/pexels-zaksheuskaya-1546251.webp",

}


export const SYSTEM_DEFAULT_HOME_FOLDERS: string[] = [
  "Desktop", "Documents", "Downloads", "Music", "Pictures", "Videos", "Downloads"
]
