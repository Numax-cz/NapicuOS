import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BootComponent} from './bios/components/boot/boot.component';
import {BiosComponent} from './bios/components/bios/bios.component';
import {BiosMainComponent} from './bios/components/bios-main/bios-main.component';
import {TweakerComponent} from './bios/components/tweaker/tweaker.component';
import {AdvancedComponent} from './bios/components/advanced/advanced.component';
import {PowerComponent} from './bios/components/power/power.component';
import {BootbComponent} from './bios/components/bootb/bootb.component';
import {ToolsComponent} from './bios/components/tools/tools.component';
import {ExitComponent} from './bios/components/exit/exit.component';
import {OptionPanelComponent} from './bios/components/option-panel/option-panel.component';
import {SettingsTemplateComponent} from './bios/components/settings-template/settings-template.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FlashComponent} from './bios/components/flash/flash.component';
import {BlackloadingComponent} from './bios/components/blackloading/blackloading.component';
import {BlackscreenComponent} from './bios/components/blackscreen/blackscreen.component';
import {GrubComponent} from './grub/grub/grub.component';
import {SystemComponent} from './grub/system/system.component';
import {NapicuOSComponent} from './system/Systems/NapicuOS/components/napicu-os/napicu-os.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WindowComponent} from './system/Systems/NapicuOS/template/window/window.component';
import {WelcomeComponent} from './system/Systems/NapicuOS/Apps/welcome/welcome.component';
import {ConsoleComponent} from './system/Systems/NapicuOS/Apps/console/console.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginscreenComponent} from './system/Systems/NapicuOS/components/loginscreen/loginscreen.component';
import {AlertComponent} from './system/Systems/NapicuOS/Apps/alert/alert.component';
import {DynamicModule} from 'ng-dynamic-component';
import {MainComponent} from './system/Systems/NapicuOS/Apps/welcome/main/main.component';
import {UserComponent} from './system/Systems/NapicuOS/Apps/welcome/user/user.component';
import {UsermanagerComponent} from './system/Systems/NapicuOS/Apps/usermanager/usermanager.component';
import {DropDownMenuComponent} from './system/Systems/NapicuOS/template/drop-down-menu/drop-down-menu.component';
import {ClickDirective} from './system/Systems/NapicuOS/template/drop-down-menu/click.directive';
import {LoadsComponent} from "./system/Systems/NapicuOS/components/loads/loads.component";
import {FileComponent} from './system/Systems/NapicuOS/Apps/file/file.component';
import {AlertInputComponent} from './system/Systems/NapicuOS/Apps/alert-input/alert-input.component';
import {WordpadComponent} from './system/Systems/NapicuOS/Apps/wordpad/wordpad.component';
import {PaintComponent} from './system/Systems/NapicuOS/Apps/paint/paint.component';
import {FlappyComponent} from './system/Systems/NapicuOS/Apps/flappy/flappy.component';
import {SettingsComponent} from './system/Systems/NapicuOS/Apps/settings/settings.component';
import {AboutComponent} from './system/Systems/NapicuOS/Apps/settings/about/about.component';
import {TimeComponent} from './system/Systems/NapicuOS/Apps/settings/time/time.component';
import {UsersComponent} from './system/Systems/NapicuOS/Apps/settings/users/users.component';
import {AppInputComponent} from './system/Systems/NapicuOS/template/app-input/app-input.component';
import {boot_configuration} from "./bios/Config/bootloader";
import {WallpaperComponent} from "./system/Systems/NapicuOS/Apps/settings/wallpaper/wallpaper.component";
import {VolumeComponent} from './system/Systems/NapicuOS/Apps/settings/volume/volume.component';
import {
  BasicSliderInputComponent
} from './system/Systems/NapicuOS/template/basic-slider-input/basic-slider-input.component';
import {CounterInputComponent} from './system/Systems/NapicuOS/template/counter-input/counter-input.component';
import {AppWindowComponent} from './system/Systems/NapicuOS/template/app-window/app-window.component';
import {CalculatorComponent} from './system/Systems/NapicuOS/Apps/calculator/calculator.component';
import {BrowserComponent, SafePipe} from './system/Systems/NapicuOS/Apps/browser/browser.component';
import {MapsComponent} from './system/Systems/NapicuOS/Apps/maps/maps.component';
import {WeatherComponent} from './system/Systems/NapicuOS/Apps/weather/weather.component';
import {HttpClientModule} from "@angular/common/http";
import {DropDownInputComponent} from './system/Systems/NapicuOS/template/drop-down-input/drop-down-input.component';
import {LanguageComponent} from './system/Systems/NapicuOS/Apps/settings/language/language.component';
import {ThemeComponent} from './system/Systems/NapicuOS/Apps/settings/theme/theme.component';
import {WelcomeLanguageComponent} from "./system/Systems/NapicuOS/Apps/welcome/language/language.component";
import {WelcomeThemeComponent} from "./system/Systems/NapicuOS/Apps/welcome/theme/theme.component";
import {InstallComponent} from './system/Systems/NapicuOS/Apps/welcome/install/install.component';
import {FinishComponent} from './system/Systems/NapicuOS/Apps/welcome/finish/finish.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {PongComponent} from './system/Systems/NapicuOS/Apps/pong/pong.component';
import {TypegameComponent} from './system/Systems/NapicuOS/Apps/type-game/typegame.component';

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
    MapsComponent,
    WeatherComponent,
    DropDownInputComponent,
    LanguageComponent,
    ThemeComponent,
    WelcomeLanguageComponent,
    WelcomeThemeComponent,
    InstallComponent,
    FinishComponent,
    PongComponent,
    TypegameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DynamicModule,
    DragDropModule,
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
