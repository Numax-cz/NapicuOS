import { Component, OnInit } from '@angular/core';
import { System } from 'src/app/Sys/System';
import { NapicuOS } from 'src/app/Sys/Systems/NapicuOS/system.napicuos';
import { SystemComponent } from '../system/system.component';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
})
export class LoadsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get Img(): string {
    var logo = SystemComponent.System.boot.logo; // TODO Remove zero index
    if (logo) {
      return logo;
    }
    return '';
  }
}
