import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {MapsComponent} from "../../apps/maps/maps.component";
import {lang_App_Maps_Title} from "../../language/SystemApp";

@NapicuApp({
  appTitle: lang_App_Maps_Title,
  processTitle: SystemAppsProcessName.maps,
  appComponent: MapsComponent,
  windowData: Window.centerPos(45, 45),
  resizeAllowed: true,
  fileIconPath: SYSTEM_IMAGES.map,
  addToDock: true,
})
export class SystemAppsMap extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsMap.appData);
  }
}
