import { Type } from '@angular/core';
import { Process } from 'src/app/Sys/Process';
import { WelcomeComponent } from './welcome/welcome.component';

export class welcome extends Process {
  public override title: string = 'welcome';
}
