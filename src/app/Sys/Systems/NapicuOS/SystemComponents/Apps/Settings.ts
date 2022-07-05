import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {SettingsComponent} from "../../Apps/settings/settings.component";

@NapicuApp({
  appTitle: 'Settings',
  processTitle: SystemAppsProcessName.settings,
  appComponent: SettingsComponent,
  windowData: Window.centerPos(65, 65),
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
