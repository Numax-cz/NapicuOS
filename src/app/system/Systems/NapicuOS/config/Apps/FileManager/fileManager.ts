import {fileConfigDisplayedMetadata} from "../../../interface/Apps/FileManager";
import {ReplaceSystemVariables} from "../../../scripts/ReplaceVariables";
import {copy} from "../../../../../../bios/Scripts/DeepClone";
import {SYSTEM_IMAGES} from "../../System";
import {NapicuOS} from "../../../system.napicuos";

const SYSTEM_APPS_FILE_MANAGER_CONFIG = (): fileConfigDisplayedMetadata[] => {
  let i = [
    {
      name: "Computer",
      directory: "/",
      icon: SYSTEM_IMAGES.Computer,
    },
  ]

  if(!NapicuOS.get_active_user_is_root()){
    i.push(
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
    )
  }

  return i;
}


export const GET_SYSTEM_FOLDERS_FILE = (): fileConfigDisplayedMetadata[] => {
  let str: fileConfigDisplayedMetadata[] = copy(SYSTEM_APPS_FILE_MANAGER_CONFIG());
  str.forEach((directory: fileConfigDisplayedMetadata) => {
    directory.name = ReplaceSystemVariables(directory.name);
    directory.directory = ReplaceSystemVariables(directory.directory);
  });
  return str;
}
