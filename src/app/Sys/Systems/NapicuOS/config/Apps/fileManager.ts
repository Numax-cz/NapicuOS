import {fileConfigDisplayedMetadata, fileConfigMetadata} from "../../interface/Apps/FileManager";
import {ReplaceSystemVariables} from "../../scripts/ReplaceVariables";
import {copy} from "../../../../../Bios/Scripts/DeepClone";

const SYSTEM_APPS_FILE_MANAGER_CONFIG: fileConfigMetadata = {
  displayedDirectorys: [
    {
      name: "Computer",
      directory: "/",
      icon: "UNDEFINED",
    },
    {
      name: "%USER",
      directory: "%USERDIR",
      icon: "UNDEFINED",
    }
  ]
}

export const GET_SYSTEM_APPS_FILE_MANAGER_DISPLAYED_FILES = (): fileConfigDisplayedMetadata[] => {
  let str: fileConfigDisplayedMetadata[] = copy(SYSTEM_APPS_FILE_MANAGER_CONFIG).displayedDirectorys;
  str.forEach((directory: fileConfigDisplayedMetadata) => {
    directory.name = ReplaceSystemVariables(directory.name);
    directory.directory = ReplaceSystemVariables(directory.directory);
  });
  return str;
}
