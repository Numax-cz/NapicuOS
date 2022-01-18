export declare type SystemFileTypeMetadata = 'executable' | 'text';

export declare interface SystemFileConsMetadata {
  value: any;
  fileName: string;
  fileType: SystemFileTypeMetadata;
  permission?: any;
}
