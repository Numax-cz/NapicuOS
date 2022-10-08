import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiModule, Configuration} from "../../OpenAPI";
import {NAPICUOS_ANGULAR_CONFIG} from "./system/Systems/NapicuOS/config/run";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApiModule.forRoot( () => {return new Configuration({basePath: NAPICUOS_ANGULAR_CONFIG.api_url})}),
  ],
  exports: [
  ]
})
export class NapicuApiModule { }
