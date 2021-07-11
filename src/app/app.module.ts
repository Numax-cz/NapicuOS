import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BootComponent } from './boot/boot.component';
import { BiosComponent } from './bios/bios.component';

@NgModule({
  declarations: [
    AppComponent,
    BootComponent,
    BiosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
