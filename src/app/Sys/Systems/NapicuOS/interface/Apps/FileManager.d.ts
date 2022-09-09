import {SystemFileTypeEnumMetadata} from "../FilesDirs/File";

export declare interface fileConfigDisplayedMetadata {
  name: string,
  directory: string,
  icon: string,
}

export declare interface filesAndDirsViewMetadata {
  name: string,
  icon: string,
  fileType: SystemFileTypeEnumMetadata | null,
}

export declare interface filesAndDirSelectMetadata{
  name: string,
  isDir: boolean
}
