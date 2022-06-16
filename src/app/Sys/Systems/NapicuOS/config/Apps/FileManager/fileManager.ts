import {fileConfigDisplayedMetadata, fileConfigMetadata} from "../../../interface/Apps/FileManager";
import {ReplaceSystemVariables} from "../../../scripts/ReplaceVariables";
import {copy} from "../../../../../../Bios/Scripts/DeepClone";
import {SYSTEM_IMAGES} from "../../System";

const SYSTEM_APPS_FILE_MANAGER_CONFIG: fileConfigMetadata = {
  displayedDirectorys: [
    {
      name: "Computer",
      directory: "/",
      icon: SYSTEM_IMAGES.Computer,
    },
    {
      name: "%USER",
      directory: "%USERDIR",
      icon: SYSTEM_IMAGES.BlueUser,
    },
    {
      name: "Documents",
      directory: "%USERDIRDocuments/",
      icon: SYSTEM_IMAGES.BlueFolderDocuments,
    },
    {
      name: "Music",
      directory: "%USERDIRDocuments/",
      icon: SYSTEM_IMAGES.BlueFolderMusic,
    },
    {
      name: "Pictures",
      directory: "%USERDIRPictures/",
      icon: SYSTEM_IMAGES.BlueFolderPictures,
    },
    {
      name: "Videos",
      directory: "%USERDIRVideos/",
      icon: SYSTEM_IMAGES.BlueFolderVideos,
    },
    {
      name: "Pictures",
      directory: "%USERDIRPictures/",
      icon: SYSTEM_IMAGES.BlueFolderPictures,
    },
    {
      name: "Downloads",
      directory: "%USERDIRDownloads/",
      icon: SYSTEM_IMAGES.BlueFolderDownloads,
    }
  ]
}

export const GET_SYSTEM_FOLDERS_FILE = (): fileConfigDisplayedMetadata[] => {
  let str: fileConfigDisplayedMetadata[] = copy(SYSTEM_APPS_FILE_MANAGER_CONFIG).displayedDirectorys;
  str.forEach((directory: fileConfigDisplayedMetadata) => {
    directory.name = ReplaceSystemVariables(directory.name);
    directory.directory = ReplaceSystemVariables(directory.directory);
  });
  return str;
}
