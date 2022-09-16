import {Component, OnDestroy, OnInit} from '@angular/core';
import {NapicuOS} from "../../system.napicuos";
import {SYSTEM_IMAGES} from "../../config/System";
import {RequestExceptionSchema, WeatherControllerService, WeatherResponseModel} from "../../../../../../../OpenAPI";
import {HttpStatusCode} from "@angular/common/http";
import {NapicuApiResponseStatus} from "../../config/NapicuApi";
import {NapicuDate} from "napicuformatter";
import {TIME_FORMAT_WEATHER} from "../../config/Time";
import {OPEN_WEATHER_ICONS} from "../../config/OpenWeather";
import {SystemProcessWeather} from "../../SystemComponents/Process/WeatherLoader";
import {SystemProcess} from "../../SystemComponents/ProcessApp";
import {SystemProcessStopWatch} from "../../SystemComponents/Process/Stopwatch";

@Component({
  selector: 'app-weather.svg',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  public city: string | null = null;
  public static apiData: WeatherResponseModel | null = null;
  public static weatherProcessStopwatch: SystemProcessStopWatch | null = null;
  public static weatherProcess: SystemProcess | null = null;
  public static apiError: boolean | null = null;
  public err: string | null = null;

  constructor(protected service: WeatherControllerService) { }

  ngOnInit(): void {
  this.loadApp();
  }

  ngOnDestroy(): void {
    this.killProcess();
  }

  public async loadApp(): Promise<void> {
    WeatherComponent.apiError = null;
    this.check_weather_api();
    this.loadProcess();
  }


  public loadProcess (): void  {
    if(!WeatherComponent.weatherProcess) {
      WeatherComponent.weatherProcess = new SystemProcessWeather(this.service);
      WeatherComponent.update_weather_data();
      WeatherComponent.weatherProcess.process.run();
    }
    if(!WeatherComponent.weatherProcessStopwatch){
      WeatherComponent.weatherProcessStopwatch = new SystemProcessStopWatch()
      WeatherComponent.weatherProcessStopwatch.process.run();
    }
  }

  public killProcess(): void {
    if(WeatherComponent.weatherProcess) WeatherComponent.weatherProcess.process.kill();
    if(WeatherComponent.weatherProcessStopwatch) WeatherComponent.weatherProcessStopwatch.process.kill();
    WeatherComponent.weatherProcess = null;
    WeatherComponent.weatherProcessStopwatch = null;
  }

  protected static async loadApiData (service: WeatherControllerService, input: string): Promise<void | string>   {
    if(!input.length) return;
    await service.get(input).toPromise()
      .then((data: WeatherResponseModel | undefined) => {
        if(data){
          WeatherComponent.apiData = data;
          NapicuOS.set_user_app_default_weather_city(WeatherComponent.apiData.name);
          WeatherComponent.weatherProcessStopwatch?.resetTime();
        }
      })
      .catch((data) => {
        let i = data.error as RequestExceptionSchema;
        WeatherComponent.apiData = null;
        if (i.code === NapicuApiResponseStatus.NAPICU_POCASI_CITY_NOT_FOUND) {
          return WeatherComponent.GetCityNotFoundErrorMessage;
        } else if (i.code === HttpStatusCode.TooManyRequests) {
          return  WeatherComponent.GetTooManyRequestsErrorMessage;
        } else  return WeatherComponent.Get404ErrorMessage;
      })
  }

  public static update_weather_data(): void  {
    let i = NapicuOS.get_active_user()?.userSetting.apps?.weather;
    if(i) WeatherComponent.loadApiData(SystemProcessWeather.weatherService, i);
    else if (WeatherComponent.weatherProcess) WeatherComponent.weatherProcess.process.kill();
  }

  public check_weather_api(): void{
     this.service.getSatus().subscribe({
      next: () => WeatherComponent.apiError = false,
      error: () => WeatherComponent.apiError = true
    })
  }

  public submitCity = async (city: string): Promise<string | null> => {
    this.err = await WeatherComponent.loadApiData(this.service, city) || null;
    return this.err;
  }

  get GetApiData(): WeatherResponseModel | null{
    return WeatherComponent.apiData;
  }

  get GetWeatherIcon(): string{
    return SYSTEM_IMAGES.weather
  }

  get GetOpenWeatherIcon(): string{
    let i: keyof typeof OPEN_WEATHER_ICONS = (WeatherComponent.apiData?.icon || "01d") as keyof typeof OPEN_WEATHER_ICONS;
    return OPEN_WEATHER_ICONS[i]
  }

  get GetTimeFormat(): string{
    return new NapicuDate().format(TIME_FORMAT_WEATHER)
  }

  get GetDataFromTest(): string{
    return NapicuOS.get_language_words().Apps.Weather.data_from;
  }

  get GetLastUpdate(): string{
    return NapicuOS.get_language_words().other.last_update_minutes(WeatherComponent.weatherProcessStopwatch?.getTime().minutes || 0);
  }

  get GetWallpaper(): string {
    return SYSTEM_IMAGES.weatherBackground;
  }

  get GetApiError(): boolean | null {
    return WeatherComponent.apiError;
  }

  static get Get404ErrorMessage(): string {
    return NapicuOS.get_language_words().Api.server_error;
  }

  static get GetCityNotFoundErrorMessage(): string {
    return NapicuOS.get_language_words().Apps.Weather.city_not_found;
  }

  static get GetTooManyRequestsErrorMessage(): string {
    return NapicuOS.get_language_words().Api.too_many_req;
  }

}
