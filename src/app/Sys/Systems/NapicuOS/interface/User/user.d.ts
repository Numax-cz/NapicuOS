import { SystemFile } from "src/app/Sys/File";

export declare type SystemUserPermissionsMetadata = 'superUser' | 'user';
export declare interface SystemUserDataMetadata {
    appsInDock: SystemFile[]
}