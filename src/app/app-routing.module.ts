import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BiosComponent } from './bios/bios.component';
import { BootComponent } from './boot/boot.component';

const routes: Routes = [
  { path: '', component: BootComponent },
  {
    path: 'bios',
    component: BiosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
