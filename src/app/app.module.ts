import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootComponent } from './boot/boot.component';
import { BiosComponent } from './bios/bios.component';
import { BiosMainComponent } from './bios-main/bios-main.component';
import { TweakerComponent } from './tweaker/tweaker.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { PowerComponent } from './power/power.component';
import { BootbComponent } from './bootb/bootb.component';
import { ToolsComponent } from './tools/tools.component';
import { ExitComponent } from './exit/exit.component';
import { OptionPanelComponent } from './option-panel/option-panel.component';
import { SettingsTemplateComponent } from './settings-template/settings-template.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlashComponent } from './flash/flash.component';


@NgModule({
  declarations: [
    AppComponent,
    BootComponent,
    BiosComponent,
    BiosMainComponent,
    TweakerComponent,
    AdvancedComponent,
    PowerComponent,
    BootbComponent,
    ToolsComponent,
    ExitComponent,
    OptionPanelComponent,
    SettingsTemplateComponent,
    FlashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
