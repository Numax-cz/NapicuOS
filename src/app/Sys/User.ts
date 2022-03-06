import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata,} from './Systems/NapicuOS/interface/User/user';
import {SystemNotification} from "./Notification";

export class User {
  private _username: string = 'user';
  private _running: boolean = false;
  private declare _password: string;
  private declare _permissions: SystemUserPermissionsEnumMetadata;
  public static readonly defaultUserSettings: SystemUserDataMetadata = {
    appsInDock: [],
    notifications: {
      notificationsList: [],
      allow: true,
      receive: true
    },
  };
  private declare _userSettings: SystemUserDataMetadata;

  constructor(
    username: string,
    password: string,
    userPermissions?: SystemUserPermissionsEnumMetadata,
  ) {
    this._username = username;
    this._password = password;
    this._permissions = userPermissions
      ? userPermissions
      : SystemUserPermissionsEnumMetadata.User;

    this._userSettings = User.defaultUserSettings;
  }

  //* * * *  Getters * * *
  /**
   * Returns the user's name
   */
  get username(): string {
    return this._username;
  }

  //* * * *  Setters * * *
  /**
   * Sets the user's username
   */
  set username(value: string) {
    this._username = value;
  }

  //* * * *  Functions * * *

  //TODO DOC
  get running(): boolean {
    return this._running;
  }

  //TODO DOC
  set running(value: boolean) {
    this._running = value;
  }

  /**
   * Returns the user's password
   */
  get password(): string {
    return this._password;
  }

  /**
   * Sets the user's password
   */
  set password(value: string) {
    this._password = value;
  }

  /**
   * Returns the user's permissions
   */
  get permissions(): SystemUserPermissionsEnumMetadata {
    return this._permissions;
  }

  /**
   * Sets the user's permissions
   */
  set permissions(value: SystemUserPermissionsEnumMetadata) {
    this._permissions = value;
  }

  /**
   * Returns the user's settings
   */
  get userSetting(): SystemUserDataMetadata {
    return this._userSettings;
  }

  /**
   * Sets the user's settings
   */
  set userSetting(value: SystemUserDataMetadata) {
    this._userSettings = value;
  }

  /**
   * Removes all notifications to the user
   */
  public clear_notification(): void {
    this._userSettings.notifications.notificationsList = [];
  }
}
