import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {CalculatorComponent} from "../../apps/calculator/calculator.component";
import {lang_App_Calculator_Title} from "../../language/SystemApp";

@NapicuApp({
  appTitle: lang_App_Calculator_Title,
  processTitle: SystemAppsProcessName.calculator,
  appComponent: CalculatorComponent,
  windowData: Window.centerPos(20, 45),
  resizeAllowed: false,
  fileIconPath: SYSTEM_IMAGES.calculator,
  addToDock: true,
})
export class SystemAppsCalculator extends SystemApp {
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsCalculator.appData);
  }
}
