import {NapicuApp} from "../../scripts/Decorators";
import {lang_App_Pong_Title} from "../../Language/SystemApp";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {PongComponent} from "../../Apps/pong/pong.component";

@NapicuApp({
  appTitle: lang_App_Pong_Title,
  processTitle: SystemAppsProcessName.pong,
  appComponent: PongComponent,
  windowData: Window.centerPos(35, 35),
  fileIconPath: SYSTEM_IMAGES.pong,
  addToDock: false,
})
export class SystemAppsPong extends SystemApp {
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsPong.appData);
  }
}
