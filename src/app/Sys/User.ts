import {
  SystemUserDataMetadata,
  SystemUserPermissionsEnumMetadata,
} from './Systems/NapicuOS/interface/User/user';
import {SystemFile} from "./File";

export class User {
  public static defaultUserDock: SystemFile[] = [];
  private _username: string = 'user';
  private _running: boolean = false;
  private declare _password: string;
  private declare _permissions: SystemUserPermissionsEnumMetadata;
  private declare _userSetting: SystemUserDataMetadata;

  constructor(
    username: string,
    password: string,
    userPermissions?: SystemUserPermissionsEnumMetadata
  ) {
    this._username = username;
    this._password = password;
    this._permissions = userPermissions
      ? userPermissions
      : SystemUserPermissionsEnumMetadata.User;
    this._userSetting = {
      appsInDock: User.defaultUserDock,
    };

  }

  //* * * *  Getters * * *
  /**
   * Returns the user's name
   */
  get username(): string {
    return this._username;
  }

  //TODO DOC
  get running(): boolean {
    return this._running;
  }

  /**
   * Returns the user's password
   */
  get password(): string {
    return this._password;
  }

  /**
   * Returns the user's permissions
   */
  get permissions(): SystemUserPermissionsEnumMetadata {
    return this._permissions;
  }

  /**
   * Returns the user's settings
   */
  get userSetting(): SystemUserDataMetadata {
    return this._userSetting;
  }

  //* * * *  Setters * * *
  /**
   * Sets the user's username
   */
  set username(value: string) {
    this._username = value;
  }

  //TODO DOC
  set running(value: boolean) {
    this._running = value;
  }

  /**
   * Sets the user's password
   */
  set password(value: string) {
    this._password = value;
  }

  /**
   * Sets the user's permissions
   */
  set permissions(value: SystemUserPermissionsEnumMetadata) {
    this._permissions = value;
  }

  /**
   * Sets the user's settings
   */
  set userSetting(value: SystemUserDataMetadata) {
    this._userSetting = value;
  }
}
