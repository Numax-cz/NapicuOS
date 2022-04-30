import {SystemUserDataMetadata} from "./User/user";
import {SystemUserPermissionsEnumMetadata} from "./User/UserPerms";

export declare interface UserConstructorMetadata {
  username: string,
  password: string,
  permissions?: SystemUserPermissionsEnumMetadata,
  userSetting?: SystemUserDataMetadata
}
