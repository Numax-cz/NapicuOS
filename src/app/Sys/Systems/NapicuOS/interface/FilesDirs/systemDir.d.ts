import { SystemFile } from 'src/app/Sys/File';

export declare interface systemDrivesMetadata {
  drives: string;
  directories?: systemDirMetadata[];
}
export declare interface systemDirMetadata {
  name: string;
  files?: SystemFile[];
  dir?: systemDirMetadata[];
}