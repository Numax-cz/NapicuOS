import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './Bios/advanced/advanced.component';
import { BiosMainComponent } from './Bios/bios-main/bios-main.component';
import { BiosGuard } from './bios.guard';

import { BiosComponent } from './Bios/bios/bios.component';
import { BootComponent } from './Bios/boot/boot.component';
import { BootbComponent } from './Bios/bootb/bootb.component';
import { ExitComponent } from './Bios/exit/exit.component';
import { FlashComponent } from './Bios/flash/flash.component';
import { PowerComponent } from './Bios/power/power.component';
import { ToolsComponent } from './Bios/tools/tools.component';
import { TweakerComponent } from './Bios/tweaker/tweaker.component';
import { BlackloadingComponent } from './Bios/blackloading/blackloading.component';
import { BlackscreenComponent } from './Bios/blackscreen/blackscreen.component';
import { BlackscreenGuard } from './blackscreen.guard';
import { LoadsComponent } from './System/loads/loads.component';

const routes: Routes = [
  { path: '', component: BootComponent },
  {
    path: 'bios',
    component: BiosComponent,
    children: [
      { path: 'main', component: BiosMainComponent },
      { path: 'tweaker', component: TweakerComponent },
      { path: 'advanced', component: AdvancedComponent },
      { path: 'power', component: PowerComponent },
      { path: 'bootb', component: BootbComponent },
      { path: 'tools', component: ToolsComponent },
      { path: 'exit', component: ExitComponent },
    ],
  },
  { path: 'flash', canActivate: [BiosGuard], component: FlashComponent },
  //todo: ?BiosGuard
  { path: 'blackloading', component: BlackloadingComponent },
  { path: 'blackscreen', canActivate: [BlackscreenGuard], component: BlackscreenComponent },
  { path: 'booting', component: LoadsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
