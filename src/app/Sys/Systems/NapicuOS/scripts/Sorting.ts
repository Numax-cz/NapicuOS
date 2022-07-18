import {SystemFile} from "../SystemComponents/File";

export function ABCSortArray(array: string[]): string[]{
  return array.sort();
}

export function ABCSortSystemFiles(files: SystemFile[]): SystemFile[]{
  return files.sort((fileA: SystemFile, fileB: SystemFile) => {
    let fileNameA = fileA.fileName.toLowerCase();
    let fileNameB = fileB.fileName.toLowerCase();

    if (fileNameA < fileNameB) {
      return -1;
    }
    if (fileNameA > fileNameB) {
      return 1;
    }
    return 0;
  });
}
