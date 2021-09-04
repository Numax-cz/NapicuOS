import { Component, OnInit } from '@angular/core';
import { MonitorInfo } from 'src/app/Array/Informations';
import { Informations } from 'src/app/interface/Informations';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit {
  public MainOptionInfo: Informations[] = MonitorInfo;
  constructor() {}

  ngOnInit(): void { }
  
}
