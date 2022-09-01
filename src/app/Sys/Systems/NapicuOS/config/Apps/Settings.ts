import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {AboutComponent} from "../../Apps/settings/about/about.component";
import {SYSTEM_IMAGES} from "../System";
import {TimeComponent} from "../../Apps/settings/time/time.component";
import {UsersComponent} from "../../Apps/settings/users/users.component";
import {WallpaperComponent} from "../../Apps/settings/wallpaper/wallpaper.component";
import {VolumeComponent} from "../../Apps/settings/volume/volume.component";
import {LanguageComponent} from "../../Apps/settings/language/language.component";
import {ThemeComponent} from "../../Apps/settings/theme/theme.component";
import {NapicuOS} from "../../system.napicuos";

export const SYSTEM_APPS_SETTINGS_OPTIONS = (): SettingsOptionsMetadata[] => {
  let lang = NapicuOS.get_language_words().Apps.Settings;
  return[
  {
    name: lang.volume,
    icon: SYSTEM_IMAGES.AudioVolumeHigh,
    component: VolumeComponent
  },
  {
    name: lang.theme,
    icon: SYSTEM_IMAGES.brush,
    component: ThemeComponent
  },
  {
    name: lang.wallpaper,
    icon: SYSTEM_IMAGES.photo,
    component: WallpaperComponent
  },
  {
    name: lang.time,
    icon: SYSTEM_IMAGES.time,
    component: TimeComponent
  },
  {
    name: lang.language,
    icon: SYSTEM_IMAGES.language,
    component: LanguageComponent
  },
  {
    name: lang.users,
    icon: SYSTEM_IMAGES.users,
    component: UsersComponent
  },
  {
    name: lang.about,
    icon: SYSTEM_IMAGES.Info2,
    component: AboutComponent
  }
]}
