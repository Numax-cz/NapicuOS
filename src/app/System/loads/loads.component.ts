import { Component, OnInit } from '@angular/core';
import { NapicuOS } from 'src/app/Array/Drives';
import { systemdata } from 'src/app/interface/System';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent implements OnInit {
  public static Systems: systemdata[] = [NapicuOS];
  constructor() { }

  ngOnInit(): void {
    console.log(LoadsComponent.Systems);
    
  }
  get Img(): string  {
    var logo = LoadsComponent.Systems[0].boot.logo; // TODO Remove zero index
    if (logo) {
      return logo;
    }
    return '';
  }
}
