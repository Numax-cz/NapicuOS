import {NapicuProcess} from "../../scripts/Decorators";
import {SystemProcess} from "../ProcessApp";
import {WeatherControllerService} from "../../../../../../../OpenAPI";
import {WeatherComponent} from "../../Apps/weather/weather.component";
import {NapicuOS} from "../../system.napicuos";

@NapicuProcess({
  processTitle: "WeatherUpdater",
  intervalTime: 1000 * 60 * 5
})
export class SystemProcessWeather extends SystemProcess{
  public declare static processName: string;
  public declare static processTime: number;
  public declare static weatherService: WeatherControllerService;

  constructor(service: WeatherControllerService) {
    super(SystemProcessWeather.processName, SystemProcessWeather.processTime);
    SystemProcessWeather.weatherService = service;
  }

  interval = (): void => {
    WeatherComponent.update_weather_data();
  }
}
