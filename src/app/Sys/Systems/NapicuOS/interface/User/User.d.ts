import {SystemRemindNotificationConstructorMetadata} from "../RemidNotification";
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {SystemTimeFormatEnumMetadata} from "../../config/TimeFormat";


export declare interface SystemUserDataMetadata {
  appsInDock: string[];
  notifications: {
    allow: boolean,
    receive: boolean,
    notificationsList: { title: string, msg: string, icon: string, time: string }[],
    remindNotificationList: SystemRemindNotificationConstructorMetadata[]
  };
  audioVolume: number,
  time: {
    format: SystemTimeFormatEnumMetadata
    sync: boolean
  },
  selectedWallpaper: string
  apps: {
    weather: null | string
  }
  theme:{
    dark: boolean
  }
}


export declare interface UserConstructorMetadata {
  username: string,
  password: string,
  permissions?: SystemUserPermissionsEnumMetadata,
  userSetting?: SystemUserDataMetadata,
  autoAuth?: boolean
}
