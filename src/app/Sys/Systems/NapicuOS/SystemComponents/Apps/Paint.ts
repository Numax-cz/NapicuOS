import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {WordpadComponent} from "../../Apps/wordpad/wordpad.component";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {PaintComponent} from "../../Apps/paint/paint.component";

@NapicuApp({
  appTitle: 'Paint',
  processTitle: SystemAppsProcessName.paint,
  appComponent: PaintComponent,
  windowData: Window.centerPos(45, 45),
  resizeAllowed: true,
  fileIconPath: SYSTEM_IMAGES.paint,
  addToDock: true,
})
export class SystemAppsPaint extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsPaint.appData);
  }
}
