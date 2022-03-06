import {SystemFile} from 'src/app/Sys/File';
import {SystemNotification} from "../../../../Notification";

export declare type SystemUserPermissionsMetadata = 'superUser' | 'user';

export declare interface SystemUserDataMetadata {
  appsInDock: SystemFile[];
  notifications: SystemNotification[],
  allowNotifications: boolean
}

export const enum SystemUserPermissionsEnumMetadata {
  SuperUser = 'SuperUser',
  User = 'User',
}
