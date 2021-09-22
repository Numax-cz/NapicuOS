import { Component, OnInit } from '@angular/core';
import { System } from 'src/app/Sys/System';
import { NapicuOS } from 'src/app/Sys/Systems/NapicuOS/system.napicuos';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
})
export class LoadsComponent implements OnInit {
  public static Systems: System[] = [new NapicuOS()]; //TODO
  constructor() {}

  ngOnInit(): void {
    console.log(LoadsComponent.Systems);
    LoadsComponent.Systems[0];
  }
  get Img(): string {
    var logo = LoadsComponent.Systems[0].boot.logo; // TODO Remove zero index
    if (logo) {
      return logo;
    }
    return '';
  }
}
