import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata,} from './Systems/NapicuOS/interface/User/user';

export class User {
  public static readonly defaultUserSettings: SystemUserDataMetadata = {
    appsInDock: [],
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
    // this._userSetting = User.defaultUserSettings;


  }

  private _username: string = 'user';

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

  private _running: boolean = false;

  //* * * *  Functions * * *

  //TODO DOC
  get running(): boolean {
    return this._running;
  }

  //TODO DOC
  set running(value: boolean) {
    this._running = value;
  }

  private declare _password: string;

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

  private declare _permissions: SystemUserPermissionsEnumMetadata;

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
}
