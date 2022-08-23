import {NapicuApp} from "../../scripts/Decorators";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {SettingsComponent} from "../../Apps/settings/settings.component";
import {Window} from "../Window";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemApp} from "../SystemApp";
import {AppCreatMetadata} from "../../interface/System";
import {WeatherComponent} from "../../Apps/weather/weather.component";

@NapicuApp({
  appTitle: 'Weather',
  processTitle: SystemAppsProcessName.weather,
  appComponent: WeatherComponent,
  windowData: Window.centerPos(45, 50),
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
