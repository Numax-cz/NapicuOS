import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {FlappyComponent} from "../../Apps/flappy/flappy.component";
import {lang_App_Flappy_Title} from "../../Language/SystemApp";

@NapicuApp({
  appTitle: lang_App_Flappy_Title,
  processTitle: SystemAppsProcessName.flappy,
  appComponent: FlappyComponent,
  windowData: Window.centerPos(70, 65),
  resizeAllowed: false,
  fileIconPath: SYSTEM_IMAGES.bird,
  addToDock: false,
})
export class SystemAppsFlappy extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsFlappy.appData);
  }
}
