import {SystemFile} from "../SystemComponents/File";

/**
 * Sorts array alphabetically
 * @param array
 * @constructor
 */
export function ABCSortArray(array: string[]): string[]{
  return array.sort();
}

/**
 * Sorts files alphabetically
 * @param files
 * @constructor
 */
export function ABCSortSystemFiles(files: SystemFile[]): SystemFile[]{
  return files.sort((fileA: SystemFile, fileB: SystemFile) => {
    let fileNameA: string = fileA.fileName.toLowerCase();
    let fileNameB: string = fileB.fileName.toLowerCase();

    if (fileNameA < fileNameB) {
      return -1;
    }
    if (fileNameA > fileNameB) {
      return 1;
    }
    return 0;
  });
}
