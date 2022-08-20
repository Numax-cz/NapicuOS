import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {MapsComponent} from "../../Apps/maps/maps.component";

@NapicuApp({
  appTitle: 'Maps',
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
