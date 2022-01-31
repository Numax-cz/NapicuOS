import {SystemFilePermissionsMetadata} from '../permissions';

declare const enum SystemFileTypeEnumMetadata {
  executable = 'Executable',
  text = 'txt',
  apps = 'Applications',
}


export declare interface SystemFileConsMetadata {
  value: any;
  fileName: string;
  fileType: SystemFileTypeEnumMetadata;
  permissions?: SystemFilePermissionsMetadata;
}

