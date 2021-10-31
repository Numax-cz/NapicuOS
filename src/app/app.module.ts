import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootComponent } from './Bios/boot/boot.component';
import { BiosComponent } from './Bios/bios/bios.component';
import { BiosMainComponent } from './Bios/bios-main/bios-main.component';
import { TweakerComponent } from './Bios/tweaker/tweaker.component';
import { AdvancedComponent } from './Bios/advanced/advanced.component';
import { PowerComponent } from './Bios/power/power.component';
import { BootbComponent } from './Bios/bootb/bootb.component';
import { ToolsComponent } from './Bios/tools/tools.component';
import { ExitComponent } from './Bios/exit/exit.component';
import { OptionPanelComponent } from './Bios/option-panel/option-panel.component';
import { SettingsTemplateComponent } from './Bios/settings-template/settings-template.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlashComponent } from './Bios/flash/flash.component';
import { BlackloadingComponent } from './Bios/blackloading/blackloading.component';
import { BlackscreenComponent } from './Bios/blackscreen/blackscreen.component';
import { GrubComponent } from './System/grub/grub.component';
import { SystemComponent } from './System/system/system.component';
import { NapicuOSComponent } from './Sys/Systems/NapicuOS/components/napicu-os/napicu-os.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowComponent } from './Sys/Systems/NapicuOS/template/window/window.component';
import { WelcomeComponent } from './Sys/Systems/NapicuOS/Apps/welcome/welcome.component';

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
    BlackloadingComponent,
    BlackscreenComponent,
    GrubComponent,
    SystemComponent,
    NapicuOSComponent,
    WelcomeComponent,
    WindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
