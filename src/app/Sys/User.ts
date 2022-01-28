import { Process } from './Process';
import {
  SystemUserDataMetadata,
  SystemUserPermissionsMetadata,
} from './Systems/NapicuOS/interface/User/user';

export class User {
  private username: string = 'user';
  public running: boolean = false;
  private declare password: string;
  private declare permissions: SystemUserPermissionsMetadata;
  private userSetting: SystemUserDataMetadata = {
    appsInDock: [],
  };
  constructor(username: string, password: string, userpermissions?: SystemUserPermissionsMetadata) {
    this.username = username;
    this.password = password;
    this.permissions = userpermissions ? userpermissions : 'user';
  }

  //* * * *  Getters * * *
  /**
   * Returns the user's name
   */
  public get_username(): string {
    return this.username;
  }
  /**
   * Returns the user's password
   */
  public get_password(): string {
    return this.password;
  }
  /**
   * Returns the user's permissions
   */
  public get_permissions(): SystemUserPermissionsMetadata {
    return this.permissions;
  }
  /**
   * Returns the user's settings
   */
  public get_user_settings(): SystemUserDataMetadata {
    return this.userSetting;
  }

  //* * * *  Setters * * *
  /**
   * Sets the user's username
   */
  public set_username(value: string): void {
    this.username = value;
  }
  /**
   * Sets the user's password
   */
  public set_password(value: string): void {
    this.password = value;
  }
  /**
   * Sets the user's permissions
   */
  public set_permissions(value: SystemUserPermissionsMetadata): void {
    this.permissions = value;
  }
}
