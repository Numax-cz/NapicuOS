import { Process } from 'src/app/Sys/Process';
import { SystemFilePermissionsMetadata } from '../permissions';

export declare type SystemFileTypeMetadata = 'executable' | 'text' | 'shell-command';

export declare interface SystemFileConsMetadata {
  value: any;
  fileName: string;
  fileType: SystemFileTypeMetadata;
  permissions?: SystemFilePermissionsMetadata;
}
