import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdvancedComponent} from './Bios/components/advanced/advanced.component';
import {BiosMainComponent} from './Bios/components/bios-main/bios-main.component';
import {BiosGuard} from './bios.guard';

import {BiosComponent} from './Bios/components/bios/bios.component';
import {BootComponent} from './Bios/components/boot/boot.component';
import {BootbComponent} from './Bios/components/bootb/bootb.component';
import {ExitComponent} from './Bios/components/exit/exit.component';
import {FlashComponent} from './Bios/components/flash/flash.component';
import {PowerComponent} from './Bios/components/power/power.component';
import {ToolsComponent} from './Bios/components/tools/tools.component';
import {TweakerComponent} from './Bios/components/tweaker/tweaker.component';
import {BlackloadingComponent} from './Bios/components/blackloading/blackloading.component';
import {BlackscreenComponent} from './Bios/components/blackscreen/blackscreen.component';
import {BlackscreenGuard} from './blackscreen.guard';

import {GrubComponent} from './Grub/grub/grub.component';

import {SystemComponent} from './Grub/system/system.component';
import {SystemGuard} from './system.guard';
import {GrubGuard} from './grub.guard';
import {MobileGuard} from './mobile.guard';

const routes: Routes = [
  {path: '', component: BootComponent, canActivate: [MobileGuard]},
  {
    path: 'bios',
    component: BiosComponent,
    children: [
      {path: 'main', component: BiosMainComponent},
      {path: 'tweaker', component: TweakerComponent},
      {path: 'advanced', component: AdvancedComponent},
      {path: 'power', component: PowerComponent},
      {path: 'bootb', component: BootbComponent},
      {path: 'tools', component: ToolsComponent},
      {path: 'exit', component: ExitComponent},
    ],
  },
  {path: 'flash', canActivate: [BiosGuard], component: FlashComponent},
  {path: 'blackloading', component: BlackloadingComponent},
  {
    path: 'blackscreen',
    canActivate: [BlackscreenGuard],
    component: BlackscreenComponent,
  },
  {path: 'grub', canActivate: [GrubGuard], component: GrubComponent},

  {
    path: 'system',
    component: SystemComponent,
    canActivate: [SystemGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
