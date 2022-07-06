import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {AboutComponent} from "../../Apps/settings/about/about.component";
import {SYSTEM_IMAGES} from "../System";
import {TimeComponent} from "../../Apps/settings/time/time.component";

export const SYSTEM_APPS_SETTINGS_OPTIONS: SettingsOptionsMetadata[] = [ //TODO CONFIG
  {
    name: "Time",
    icon: SYSTEM_IMAGES.time,
    component: TimeComponent
  },
  {
    name: "About",
    icon: SYSTEM_IMAGES.Info2,
    component: AboutComponent
  }



]
