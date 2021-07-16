import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootComponent } from './boot/boot.component';
import { BiosComponent } from './bios/bios.component';
import { BiosMainComponent } from './bios-main/bios-main.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { OptionPanelComponent } from './option-panel/option-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    BootComponent,
    BiosComponent,
    BiosMainComponent,
    AdvancedComponent,
    OptionPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
