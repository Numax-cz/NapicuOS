import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { BiosMainComponent } from './bios-main/bios-main.component';
import { BiosGuard } from './bios.guard';

import { BiosComponent } from './bios/bios.component';
import { BootComponent } from './boot/boot.component';
import { BootbComponent } from './bootb/bootb.component';
import { ExitComponent } from './exit/exit.component';
import { FlashComponent } from './flash/flash.component';
import { PowerComponent } from './power/power.component';
import { ToolsComponent } from './tools/tools.component';
import { TweakerComponent } from './tweaker/tweaker.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
