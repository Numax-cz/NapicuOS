import {Component, OnDestroy, OnInit} from '@angular/core';
import {NapicuOS} from "../../system.napicuos";
import {SYSTEM_IMAGES} from "../../config/System";
import {WeatherControllerService, WeatherResponseModel} from "../../../../../../../OpenAPI";
import {HttpStatusCode} from "@angular/common/http";
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

  public static apiErrorText: string | null = null;


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
    await service.get(input, NapicuOS.get_active_user_language()).toPromise()
      .then((data: WeatherResponseModel | undefined) => {
        if(data){
          WeatherComponent.apiData = data;
          NapicuOS.set_user_app_default_weather_city(WeatherComponent.apiData.name);
          WeatherComponent.weatherProcessStopwatch?.resetTime();
        }
      })
      .catch((err) => {
        WeatherComponent.apiData = null;
        WeatherComponent.apiError = true;
        if(err.status === HttpStatusCode.TooManyRequests){
          this.apiErrorText = this.GetTooManyRequestsText;
        }else {
          this.apiErrorText = this.GetServerError
        }
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
    return await WeatherComponent.loadApiData(this.service, city) || null;
  }

  static get GetServerError(): string {
    return NapicuOS.get_language_words().Api.server_error;
  }

  get GetTryAgaiButton(): string {
    return NapicuOS.get_language_words().other.try_again;
  }

  get GetWelcomeText(): string {
    return NapicuOS.get_language_words().other.weather_welcome;
  }

  get GetOnStartText(): string {
    return NapicuOS.get_language_words().other.weather_on_start;
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

  get GetApiErrorText(): string | null {
    return WeatherComponent.apiErrorText;
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

  static get GetTooManyRequestsText(): string {
    return NapicuOS.get_language_words().Api.too_many_req;
  }
}
