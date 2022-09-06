import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {ConsoleComponent} from "../../Apps/console/console.component";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {lang_App_Terminal_Title} from "../../Language/SystemApp";

@NapicuApp({
  appTitle: lang_App_Terminal_Title,
  processTitle: SystemAppsProcessName.terminal,
  appComponent: ConsoleComponent,
  windowData: Window.centerPos(35, 35),
  fileIconPath: SYSTEM_IMAGES.Term,
  addToDock: true,
})
export class SystemAppsTerminal extends SystemApp {
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsTerminal.appData);
  }
}
