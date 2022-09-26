import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {WeatherComponent} from "../../Apps/weather/weather.component";
import {lang_App_Weather_Title} from "../../Language/SystemApp";

@NapicuApp({
  appTitle: lang_App_Weather_Title,
  processTitle: SystemAppsProcessName.weather,
  appComponent: WeatherComponent,
  windowData: Window.centerPos(53, 67),
  resizeAllowed: true,
  fileIconPath: SYSTEM_IMAGES.weather,
  addToDock: true,
})
export class SystemAppsWeather extends SystemApp{
  public static declare appData: AppCreatMetadata;

  constructor() {
    super(SystemAppsWeather.appData);
  }
}
