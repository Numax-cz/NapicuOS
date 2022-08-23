import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../system.napicuos";
import {SYSTEM_IMAGES} from "../../config/System";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {WINDOW_ANIMATION_TIME} from "../../config/WindowAnimations";
import {NOTIFICATION_ANIMATION_TIME} from "../../config/NotificationAnimations";
import {RequestExceptionSchema, WeatherControllerService, WeatherResponseModel} from "../../../../../../../OpenAPI";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {NapicuApiResponseStatus} from "../../config/NapicuApi";

@Component({
  selector: 'app-weather.svg',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public city: string | null = null;
  public data: WeatherResponseModel | undefined = undefined;
  public err: string | null = null;

  constructor(protected service: WeatherControllerService) {
    //TODO Load cookies

    if(this.city){
      this.service.get(this.city).subscribe({
          next: (data: WeatherResponseModel) => this.data = data,
          error: (data: HttpErrorResponse) => {
            let i = data.error as RequestExceptionSchema;
            // this.data = null
            if(i.code === NapicuApiResponseStatus.NAPICU_POCASI_CITY_NOT_FOUND){
              this.err = this.GetCityNotFoundErrorMessage;
            } else  if(i.code === HttpStatusCode.TooManyRequests) {
              this.err = this.GetTooManyRequestsErrorMessage;
            }else this.err = this.Get404ErrorMessage;
          }
        }
      )
    }
  }

  ngOnInit(): void {

  }

  get GetWeatherIcon(): string{
    return SYSTEM_IMAGES.weather
  }

  get GetCityNotFoundErrorMessage(): string {
    return NapicuOS.get_language_words().Apps.Weather.city_not_found;
  }

  get GetTooManyRequestsErrorMessage(): string {
    return NapicuOS.get_language_words().Api.too_many_req;
  }

  get Get404ErrorMessage(): string {
    return NapicuOS.get_language_words().Api.server_error;
  }

}
