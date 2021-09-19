import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss']
})
export class LoadsComponent implements OnInit {
  public static Systems: any = []
  constructor() { }

  ngOnInit(): void {
    console.log(LoadsComponent.Systems);
    
  }

}
