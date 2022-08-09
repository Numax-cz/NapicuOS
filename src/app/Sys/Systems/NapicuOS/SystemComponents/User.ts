import {SystemUserDataMetadata, UserConstructorMetadata} from '../interface/User/User';
import {SystemUserPermissionsEnumMetadata} from "../config/UserPerms";
import {copy} from "../../../../Bios/Scripts/DeepClone";
import {SYSTEM_WALLPAPERS} from "../config/System";

export class User {
  public username: string = 'user';
  public declare password: string;
  public declare permissions: SystemUserPermissionsEnumMetadata;
  public declare autoAuth: boolean;
  public static readonly defaultUserSettings: SystemUserDataMetadata = {
    appsInDock: [],
    notifications: {
      notificationsList: [],
      remindNotificationList: [],
      allow: true,
      receive: true
    },
    audioVolume: 1,
    selectedWallpaper: SYSTEM_WALLPAPERS.default_wallpaper
  };
  public declare userSetting: SystemUserDataMetadata;

  constructor(
    data: UserConstructorMetadata
  ) {
    this.username = data.username;
    this.password = data.password;
    this.permissions = data.permissions || SystemUserPermissionsEnumMetadata.User;
    this.userSetting = data.userSetting || copy(User.defaultUserSettings);
    this.autoAuth = !!(data.autoAuth);
  }
}
