import { Component, OnInit } from '@angular/core';
import { systemdata } from 'src/app/interface/System';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent implements OnInit {
  public static Systems: systemdata[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log(LoadsComponent.Systems);
    
  }

}
