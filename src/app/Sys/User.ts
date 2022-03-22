import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata,} from './Systems/NapicuOS/interface/User/user';
import {SystemNotification} from "./Notification";
import {UserConstructorMetadata} from "./Systems/NapicuOS/interface/user";

export class User {
  public username: string = 'user';
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
    data: UserConstructorMetadata
  ) {
    this.username = data.username;
    this.password = data.password;
    this.permissions = data.permissions || SystemUserPermissionsEnumMetadata.User;
    this.userSetting = data.userSetting || User.defaultUserSettings;
  }
}
