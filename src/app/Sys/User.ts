import { Process } from './Process';
import { SystemUserPermissionsMetadata } from './Systems/NapicuOS/interface/User/user';

export class User {
  private username: string = 'user';
  private process: Process[] = [];
  private declare password: string;
  private declare permissions: SystemUserPermissionsMetadata;
  constructor(username: string, password: string, userpermissions?: SystemUserPermissionsMetadata) {
    this.username = username;
    this.password = password;
    this.permissions = userpermissions ? userpermissions : 'user';
  }

  //* * * *  Getters * * *
  /**
   * Returns the username
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
