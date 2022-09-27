import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {AboutComponent} from "../../apps/settings/about/about.component";
import {SYSTEM_IMAGES} from "../System";
import {TimeComponent} from "../../apps/settings/time/time.component";
import {UsersComponent} from "../../apps/settings/users/users.component";
import {WallpaperComponent} from "../../apps/settings/wallpaper/wallpaper.component";
import {VolumeComponent} from "../../apps/settings/volume/volume.component";
import {LanguageComponent} from "../../apps/settings/language/language.component";
import {ThemeComponent} from "../../apps/settings/theme/theme.component";
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
