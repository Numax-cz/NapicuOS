import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BootComponent} from './Bios/components/boot/boot.component';
import {BiosComponent} from './Bios/components/bios/bios.component';
import {BiosMainComponent} from './Bios/components/bios-main/bios-main.component';
import {TweakerComponent} from './Bios/components/tweaker/tweaker.component';
import {AdvancedComponent} from './Bios/components/advanced/advanced.component';
import {PowerComponent} from './Bios/components/power/power.component';
import {BootbComponent} from './Bios/components/bootb/bootb.component';
import {ToolsComponent} from './Bios/components/tools/tools.component';
import {ExitComponent} from './Bios/components/exit/exit.component';
import {OptionPanelComponent} from './Bios/components/option-panel/option-panel.component';
import {SettingsTemplateComponent} from './Bios/components/settings-template/settings-template.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FlashComponent} from './Bios/components/flash/flash.component';
import {BlackloadingComponent} from './Bios/components/blackloading/blackloading.component';
import {BlackscreenComponent} from './Bios/components/blackscreen/blackscreen.component';
import {GrubComponent} from './Grub/grub/grub.component';
import {SystemComponent} from './Grub/system/system.component';
import {NapicuOSComponent} from './Sys/Systems/NapicuOS/components/napicu-os/napicu-os.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WindowComponent} from './Sys/Systems/NapicuOS/template/window/window.component';
import {WelcomeComponent} from './Sys/Systems/NapicuOS/Apps/welcome/welcome.component';
import {ConsoleComponent} from './Sys/Systems/NapicuOS/Apps/console/console.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginscreenComponent} from './Sys/Systems/NapicuOS/components/loginscreen/loginscreen.component';
import {AlertComponent} from './Sys/Systems/NapicuOS/Apps/alert/alert.component';
import {DynamicModule} from 'ng-dynamic-component';
import {MainComponent} from './Sys/Systems/NapicuOS/Apps/welcome/main/main.component';
import {UserComponent} from './Sys/Systems/NapicuOS/Apps/welcome/user/user.component';
import {UsermanagerComponent} from './Sys/Systems/NapicuOS/Apps/usermanager/usermanager.component';
import {DropDownMenuComponent} from './Sys/Systems/NapicuOS/template/drop-down-menu/drop-down-menu.component';
import {ClickDirective} from './Sys/Systems/NapicuOS/template/drop-down-menu/click.directive';
import {LoadsComponent} from "./Sys/Systems/NapicuOS/components/loads/loads.component";
import {FileComponent} from './Sys/Systems/NapicuOS/Apps/file/file.component';
import {AlertInputComponent} from './Sys/Systems/NapicuOS/Apps/alert-input/alert-input.component';
import {WordpadComponent} from './Sys/Systems/NapicuOS/Apps/wordpad/wordpad.component';
import {PaintComponent} from './Sys/Systems/NapicuOS/Apps/paint/paint.component';
import {FlappyComponent} from './Sys/Systems/NapicuOS/Apps/flappy/flappy.component';
import {SettingsComponent} from './Sys/Systems/NapicuOS/Apps/settings/settings.component';
import {AboutComponent} from './Sys/Systems/NapicuOS/Apps/settings/about/about.component';
import {TimeComponent} from './Sys/Systems/NapicuOS/Apps/settings/time/time.component';
import {UsersComponent} from './Sys/Systems/NapicuOS/Apps/settings/users/users.component';
import {AppInputComponent} from './Sys/Systems/NapicuOS/template/app-input/app-input.component';
import {boot_configuration} from "./Bios/Config/bootloader";
import {WallpaperComponent} from "./Sys/Systems/NapicuOS/Apps/settings/wallpaper/wallpaper.component";
import {VolumeComponent} from './Sys/Systems/NapicuOS/Apps/settings/volume/volume.component';
import {
  BasicSliderInputComponent
} from './Sys/Systems/NapicuOS/template/basic-slider-input/basic-slider-input.component';
import {CounterInputComponent} from './Sys/Systems/NapicuOS/template/counter-input/counter-input.component';
import { AppWindowComponent } from './Sys/Systems/NapicuOS/template/app-window/app-window.component';
import { CalculatorComponent } from './Sys/Systems/NapicuOS/Apps/calculator/calculator.component';
import {BrowserComponent, SafePipe} from './Sys/Systems/NapicuOS/Apps/browser/browser.component';
import { MapsComponent } from './Sys/Systems/NapicuOS/Apps/maps/maps.component';

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
    ConsoleComponent,
    LoginscreenComponent,
    AlertComponent,
    MainComponent,
    UserComponent,
    UsermanagerComponent,
    DropDownMenuComponent,
    ClickDirective,
    LoadsComponent,
    FileComponent,
    AlertInputComponent,
    WordpadComponent,
    PaintComponent,
    FlappyComponent,
    SettingsComponent,
    AboutComponent,
    TimeComponent,
    UsersComponent,
    AppInputComponent,
    WallpaperComponent,
    VolumeComponent,
    BasicSliderInputComponent,
    CounterInputComponent,
    AppWindowComponent,
    CalculatorComponent,
    BrowserComponent,
    SafePipe,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DynamicModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: boot_configuration.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
