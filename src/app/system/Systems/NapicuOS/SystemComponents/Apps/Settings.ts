import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {SettingsComponent} from "../../apps/settings/settings.component";
import {lang_App_Settings_Title} from "../../language/SystemApp";

@NapicuApp({
  appTitle: lang_App_Settings_Title,
  processTitle: SystemAppsProcessName.settings,
  appComponent: SettingsComponent,
  windowData: Window.centerPos(68, 70),
  resizeAllowed: true,
  fileIconPath: SYSTEM_IMAGES.settings_blue,
  addToDock: true,
})
export class SystemAppsSettings extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsSettings.appData);
  }
}
