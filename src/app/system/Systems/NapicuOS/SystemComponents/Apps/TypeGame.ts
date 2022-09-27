import {NapicuApp} from "../../scripts/Decorators";
import {lang_App_Type_Game_Title} from "../../language/SystemApp";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {TypegameComponent} from "../../apps/type-game/typegame.component";

@NapicuApp({
  appTitle: lang_App_Type_Game_Title,
  processTitle: SystemAppsProcessName.typeGame,
  appComponent: TypegameComponent, windowData: Window.centerPos(75, 75),
  fileIconPath: SYSTEM_IMAGES.keyboard,
  resizeAllowed: true,
  addToDock: false,
})
export class SystemAppsTypeGame extends SystemApp {
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsTypeGame.appData);
  }
}
