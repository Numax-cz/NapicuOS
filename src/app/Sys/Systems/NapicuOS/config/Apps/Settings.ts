import {SettingsOptionsMetadata} from "../../interface/Apps/Settings";
import {AboutComponent} from "../../Apps/settings/about/about.component";
import {SYSTEM_IMAGES} from "../System";

export const SYSTEM_APPS_SETTINGS_OPTIONS: SettingsOptionsMetadata[] = [
  {
    name: "About",
    icon: SYSTEM_IMAGES.Info2,
    component: AboutComponent
  }


]
