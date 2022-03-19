import {SystemUserDataMetadata, SystemUserPermissionsEnumMetadata} from "./User/user";

export declare interface UserConstructorMetadata {
  username: string,
  password: string,
  userPermissions?: SystemUserPermissionsEnumMetadata,
  userSettings?: SystemUserDataMetadata
}
