import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../system.napicuos";
import {SYSTEM_DEFAULT_TIME_FORMAT, SYSTEM_IMAGES, SYSTEM_WALLPAPERS} from "../../config/System";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {WINDOW_ANIMATION_TIME} from "../../config/WindowAnimations";
import {NOTIFICATION_ANIMATION_TIME} from "../../config/NotificationAnimations";
import {RequestExceptionSchema, WeatherControllerService, WeatherResponseModel} from "../../../../../../../OpenAPI";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {NapicuApiResponseStatus} from "../../config/NapicuApi";
import {NapicuDate} from "napicuformatter";
import {GET_SYSTEM_TIME_FORMAT, TIME_FORMAT_WEATHER} from "../../config/Time";
import {OPEN_WEATHER_ICONS} from "../../config/OpenWeather";

@Component({
  selector: 'app-weather.svg',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public city: string | null = null;
  public apiData: WeatherResponseModel | null = null;
  public err: string | null = null;

  constructor(protected service: WeatherControllerService) {
    // let i = NapicuOS.get_active_user()?.userSetting.apps?.weather;
    // if (i) this.loadApiData(i);
  }

  ngOnInit(): void {

  }

  public async loadApiData (input: string): Promise<void>   {
    if(!input.length) return;
    this.err = null;
    await this.service.get(input).toPromise()
      .then((data) => {
        if(data){
          this.apiData = data;
          NapicuOS.set_user_app_default_weather_city(this.apiData.name);
        }
      })
      .catch((data) => {
        let i = data.error as RequestExceptionSchema;
        this.apiData = null;
        if (i.code === NapicuApiResponseStatus.NAPICU_POCASI_CITY_NOT_FOUND) {
          this.err = this.GetCityNotFoundErrorMessage;
        } else if (i.code === HttpStatusCode.TooManyRequests) {
          this.err = this.GetTooManyRequestsErrorMessage;
        } else this.err = this.Get404ErrorMessage;
      })
  }


  public submitCity = async (city: string): Promise<string | null> => {
    await this.loadApiData(city);
    return this.err;
  }

  get GetWeatherIcon(): string{
    return SYSTEM_IMAGES.weather
  }

  get GetOpenWeatherIcon(): string{
    return OPEN_WEATHER_ICONS["01d"]
  }

  get GetCityNotFoundErrorMessage(): string {
    return NapicuOS.get_language_words().Apps.Weather.city_not_found;
  }

  get GetTooManyRequestsErrorMessage(): string {
    return NapicuOS.get_language_words().Api.too_many_req;
  }

  get GetTimeFormat(): string{
    return new NapicuDate().format(TIME_FORMAT_WEATHER)
  }

  get Get404ErrorMessage(): string {
    return NapicuOS.get_language_words().Api.server_error;
  }

}
