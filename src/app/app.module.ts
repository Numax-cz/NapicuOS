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
import {WelcomeComponent} from './system/Systems/NapicuOS/apps/welcome/welcome.component';
import {ConsoleComponent} from './system/Systems/NapicuOS/apps/console/console.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginscreenComponent} from './system/Systems/NapicuOS/components/loginscreen/loginscreen.component';
import {AlertComponent} from './system/Systems/NapicuOS/apps/alert/alert.component';
import {DynamicModule} from 'ng-dynamic-component';
import {MainComponent} from './system/Systems/NapicuOS/apps/welcome/main/main.component';
import {UserComponent} from './system/Systems/NapicuOS/apps/welcome/user/user.component';
import {UsermanagerComponent} from './system/Systems/NapicuOS/apps/usermanager/usermanager.component';
import {DropDownMenuComponent} from './system/Systems/NapicuOS/template/drop-down-menu/drop-down-menu.component';
import {ClickDirective} from './system/Systems/NapicuOS/template/drop-down-menu/click.directive';
import {LoadsComponent} from "./system/Systems/NapicuOS/components/loads/loads.component";
import {FileComponent} from './system/Systems/NapicuOS/apps/file/file.component';
import {AlertInputComponent} from './system/Systems/NapicuOS/apps/alert-input/alert-input.component';
import {WordpadComponent} from './system/Systems/NapicuOS/apps/wordpad/wordpad.component';
import {PaintComponent} from './system/Systems/NapicuOS/apps/paint/paint.component';
import {FlappyComponent} from './system/Systems/NapicuOS/apps/flappy/flappy.component';
import {SettingsComponent} from './system/Systems/NapicuOS/apps/settings/settings.component';
import {AboutComponent} from './system/Systems/NapicuOS/apps/settings/about/about.component';
import {TimeComponent} from './system/Systems/NapicuOS/apps/settings/time/time.component';
import {UsersComponent} from './system/Systems/NapicuOS/apps/settings/users/users.component';
import {AppInputComponent} from './system/Systems/NapicuOS/template/app-input/app-input.component';
import {boot_configuration} from "./bios/config/bootloader";
import {WallpaperComponent} from "./system/Systems/NapicuOS/apps/settings/wallpaper/wallpaper.component";
import {VolumeComponent} from './system/Systems/NapicuOS/apps/settings/volume/volume.component';
import {
  BasicSliderInputComponent
} from './system/Systems/NapicuOS/template/basic-slider-input/basic-slider-input.component';
import {CounterInputComponent} from './system/Systems/NapicuOS/template/counter-input/counter-input.component';
import {AppWindowComponent} from './system/Systems/NapicuOS/template/app-window/app-window.component';
import {CalculatorComponent} from './system/Systems/NapicuOS/apps/calculator/calculator.component';
import {BrowserComponent, SafePipe} from './system/Systems/NapicuOS/apps/browser/browser.component';
import {MapsComponent} from './system/Systems/NapicuOS/apps/maps/maps.component';
import {WeatherComponent} from './system/Systems/NapicuOS/apps/weather/weather.component';
import {HttpClientModule} from "@angular/common/http";
import {DropDownInputComponent} from './system/Systems/NapicuOS/template/drop-down-input/drop-down-input.component';
import {LanguageComponent} from './system/Systems/NapicuOS/apps/settings/language/language.component';
import {ThemeComponent} from './system/Systems/NapicuOS/apps/settings/theme/theme.component';
import {WelcomeLanguageComponent} from "./system/Systems/NapicuOS/apps/welcome/language/language.component";
import {WelcomeThemeComponent} from "./system/Systems/NapicuOS/apps/welcome/theme/theme.component";
import {InstallComponent} from './system/Systems/NapicuOS/apps/welcome/install/install.component';
import {FinishComponent} from './system/Systems/NapicuOS/apps/welcome/finish/finish.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {PongComponent} from './system/Systems/NapicuOS/apps/pong/pong.component';
import {TypegameComponent} from './system/Systems/NapicuOS/apps/type-game/typegame.component';
import {NapicuApiModule} from "./napicu-api.module";

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
    NapicuApiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
