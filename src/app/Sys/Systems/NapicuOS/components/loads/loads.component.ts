import { Component, OnInit } from '@angular/core';
import { Loading } from 'src/app/Scripts/LoadingAnimations';
import { System } from 'src/app/Sys/System';
import { NapicuOS } from 'src/app/Sys/Systems/NapicuOS/system.napicuos';
import { GrubComponent } from 'src/app/System/grub/grub.component';


@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
})
export class LoadsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get Img(): string {
    var logo = GrubComponent.ActiveSystem.boot.logo; // TODO Remove zero index
    if (logo) {
      return logo;
    }
    return '';
  }
}
