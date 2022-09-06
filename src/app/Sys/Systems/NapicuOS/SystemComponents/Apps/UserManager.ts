import {SystemApp} from "../SystemApp";
import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {UsermanagerComponent} from "../../Apps/usermanager/usermanager.component";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {AppCreatMetadata} from "../../interface/System";
import {lang_App_User_Title} from "../../Language/SystemApp";

@NapicuApp({
  appTitle: lang_App_User_Title,
  processTitle: SystemAppsProcessName.userManager,
  appComponent: UsermanagerComponent,
  windowData: Window.centerPos(25, 32),
  resizeAllowed: false,
  fileIconPath: SYSTEM_IMAGES.User,
  addToDock: false,
  multiRun: true
})
export class SystemAppsUserManager extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsUserManager.appData);
  }
}
