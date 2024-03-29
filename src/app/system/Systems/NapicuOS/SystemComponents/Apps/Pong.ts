import {NapicuApp} from "../../scripts/Decorators";
import {lang_App_Pong_Title} from "../../language/SystemApp";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {PongComponent} from "../../apps/pong/pong.component";

@NapicuApp({
  appTitle: lang_App_Pong_Title,
  processTitle: SystemAppsProcessName.pong,
  appComponent: PongComponent,
  windowData: Window.centerPos(55, 65),
  fileIconPath: SYSTEM_IMAGES.pong,
  resizeAllowed: false,
  addToDock: false,
})
export class SystemAppsPong extends SystemApp {
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsPong.appData);
  }
}
