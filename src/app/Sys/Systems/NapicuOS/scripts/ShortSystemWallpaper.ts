import {NapicuOS} from "../system.napicuos";
import {SYSTEM_WALLPAPERS} from "../config/System";

export function ShortSystemWallpaper(path: string | SYSTEM_WALLPAPERS): string{
  const u = path as SYSTEM_WALLPAPERS;
  let index = Object.values(SYSTEM_WALLPAPERS).indexOf(u);
  if(index > -1){
    return  Object.keys(SYSTEM_WALLPAPERS)[index];
  }else {
    return path;
  }
}
