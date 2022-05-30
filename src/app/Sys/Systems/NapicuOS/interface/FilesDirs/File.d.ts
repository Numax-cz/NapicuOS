import {SystemFilePermissionsMetadata} from '../Permissions';

declare const enum SystemFileTypeEnumMetadata {
  executable = 'exc',
  apps = 'app',
  audio = "audio",
  image = "image",
  document = "doc",
}

export declare interface SystemFileConsMetadata {
  /**
   * File value
   */
  value: any;
  /**
   * File name
   */
  fileName: string;
  /**
   * File type
   */
  fileType: SystemFileTypeEnumMetadata;
  /**
   * File permissions
   */
  permissions?: SystemFilePermissionsMetadata;
  /**
   * File icon
   */
  iconPath?: string
  /**
   * File author
   */
  createdBy?: string
}
