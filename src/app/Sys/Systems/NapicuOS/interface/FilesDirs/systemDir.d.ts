import { SystemFile } from 'src/app/Sys/File';

export declare interface systemDrivesMetadata {
  [index: string]: systemDirMetadata;
}
export declare interface systemDirMetadata {
  // name: string;

  files?: SystemFile[];
  dir?: { [index: string]: systemDirMetadata };
}
