export declare type SystemUserPermissionsMetadata = 'superUser' | 'user';

export declare interface SystemUserDataMetadata {
  appsInDock: string[];
  notifications: {
    allow: boolean,
    receive: boolean,
    notificationsList: { title: string, msg: string, icon: string, time: string }[],
  };
  audioVolume: number
}

export const enum SystemUserPermissionsEnumMetadata {
  SuperUser = 'SuperUser',
  User = 'User',
}
