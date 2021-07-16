import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { BiosMainComponent } from './bios-main/bios-main.component';

import { BiosComponent } from './bios/bios.component';
import { BootComponent } from './boot/boot.component';


const routes: Routes = [
  { path: '', component: BootComponent },
  {
    path: 'bios',
    component: BiosComponent,
    children: [
      { path: 'main', component: BiosMainComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
