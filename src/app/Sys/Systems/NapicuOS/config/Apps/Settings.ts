import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {AboutComponent} from "../../Apps/settings/about/about.component";
import {SYSTEM_IMAGES} from "../System";
import {TimeComponent} from "../../Apps/settings/time/time.component";
import {UsersComponent} from "../../Apps/settings/users/users.component";
import {WallpaperComponent} from "../../Apps/settings/wallpaper/wallpaper.component";
import {VolumeComponent} from "../../Apps/settings/volume/volume.component";

export const SYSTEM_APPS_SETTINGS_OPTIONS: SettingsOptionsMetadata[] = [ //TODO CONFIG
  {
    name: "Volume",
    icon: SYSTEM_IMAGES.AudioVolumeHigh,
    component: VolumeComponent
  },
  {
    name: "Wallpaper",
    icon: SYSTEM_IMAGES.photo,
    component: WallpaperComponent
  },
  {
    name: "Time",
    icon: SYSTEM_IMAGES.time,
    component: TimeComponent
  },
  {
    name: "Users",
    icon: SYSTEM_IMAGES.users,
    component: UsersComponent
  },
  {
    name: "About",
    icon: SYSTEM_IMAGES.Info2,
    component: AboutComponent
  }



]
