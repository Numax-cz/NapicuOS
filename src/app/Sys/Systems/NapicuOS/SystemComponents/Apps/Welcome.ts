import {SystemApp} from "../SystemApp";
import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {WelcomeComponent} from "../../Apps/welcome/welcome.component";
import {Window} from "../Window";
import {AppCreatMetadata} from "../../interface/System";
import {lang_App_Welcome_Title} from "../../Language/SystemApp";


@NapicuApp({
  appTitle: lang_App_Welcome_Title,
  processTitle: SystemAppsProcessName.installer,
  appComponent: WelcomeComponent,
  windowData: Window.centerPos(75, 75),
  resizeAllowed: false,
  fileIconPath: '/assets/systems/NapicuOS/Logo.svg', //TODO config
  addToDock: true,
  multiRun: false
})
export class SystemAppsWelcome extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsWelcome.appData);
  }
}
