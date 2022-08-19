import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {BrowserComponent} from "../../Apps/browser/browser.component";

@NapicuApp({
  appTitle: 'Browser',
  processTitle: SystemAppsProcessName.browser,
  appComponent: BrowserComponent,
  windowData: Window.centerPos(68, 70),
  resizeAllowed: true,
  fileIconPath: SYSTEM_IMAGES.browser,
  addToDock: true,
})
export class SystemAppsBrowser extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsBrowser.appData);
  }
}
