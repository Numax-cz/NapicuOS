import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../system.napicuos";
import {SYSTEM_IMAGES} from "../../config/System";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {WINDOW_ANIMATION_TIME} from "../../config/WindowAnimations";
import {NOTIFICATION_ANIMATION_TIME} from "../../config/NotificationAnimations";

@Component({
  selector: 'app-weather.svg',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }

  get GetWeatherIcon(): string{
    return SYSTEM_IMAGES.weather
  }

}
