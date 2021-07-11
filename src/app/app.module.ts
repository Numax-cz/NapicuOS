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
    ExitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
