import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata} from "./User/user";

export declare interface UserConstructorMetadata {
  username: string,
  password: string,
  permissions?: SystemUserPermissionsEnumMetadata,
  userSetting?: SystemUserDataMetadata
}
