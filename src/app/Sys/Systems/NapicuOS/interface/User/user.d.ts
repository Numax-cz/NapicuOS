import {SystemFile} from 'src/app/Sys/File';
import {SystemNotification} from "../../../../Notification";

export declare type SystemUserPermissionsMetadata = 'superUser' | 'user';

export declare interface SystemUserDataMetadata {
  appsInDock: string[];
  notifications: {
    allow: boolean,
    receive: boolean,
    notificationsList: SystemNotification[],
  }
}

export const enum SystemUserPermissionsEnumMetadata {
  SuperUser = 'SuperUser',
  User = 'User',
}
