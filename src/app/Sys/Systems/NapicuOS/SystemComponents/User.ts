import {SystemUserDataMetadata, UserConstructorMetadata} from '../interface/User/User';
import {SystemUserPermissionsEnumMetadata} from "../config/UserPerms";

export class User {
  public username: string = 'user';
  public declare password: string;
  public declare permissions: SystemUserPermissionsEnumMetadata;
  public static readonly defaultUserSettings: SystemUserDataMetadata = {
    appsInDock: [],
    notifications: {
      notificationsList: [],
      remindNotificationList: [],
      allow: true,
      receive: true
    },
    audioVolume: 1,
    drives: {}
  };
  public declare userSetting: SystemUserDataMetadata;

  constructor(
    data: UserConstructorMetadata
  ) {
    this.username = data.username;
    this.password = data.password;
    this.permissions = data.permissions || SystemUserPermissionsEnumMetadata.User;
    this.userSetting = data.userSetting || User.defaultUserSettings;
  }
}
