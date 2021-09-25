import { Component, OnInit } from '@angular/core';
import { System } from 'src/app/Sys/System';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class  SystemComponent implements OnInit {
  public static System: System; //TODO
  constructor() {}

  ngOnInit(): void {}
}