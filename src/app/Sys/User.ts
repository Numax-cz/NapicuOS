import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata,} from './Systems/NapicuOS/interface/User/user';
import {SystemNotification} from "./Notification";

export class User {
  public username: string = 'user';
  public running: boolean = false;
  public declare password: string;
  public declare permissions: SystemUserPermissionsEnumMetadata;
  public static readonly defaultUserSettings: SystemUserDataMetadata = {
    appsInDock: [],
    notifications: {
      notificationsList: [],
      allow: true,
      receive: true
    },
  };
  public declare userSetting: SystemUserDataMetadata;

  constructor(
    username: string,
    password: string,
    userPermissions?: SystemUserPermissionsEnumMetadata,
  ) {
    this.username = username;
    this.password = password;
    this.permissions = userPermissions
      ? userPermissions
      : SystemUserPermissionsEnumMetadata.User;

    this.userSetting = User.defaultUserSettings;
  }
}
