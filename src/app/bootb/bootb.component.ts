import { Component, OnInit } from '@angular/core';
import { Boot } from '../Array/ToolSettings';
import { ComponentClass } from '../interface/ComponentClass';
import { settings, ToolSettings } from '../interface/ToolSettings';
import { isOption, isTime, isDate } from '../Scripts/Type';
import { Screen } from '../interface/Screen';
@Component({
  selector: 'app-bootb',
  templateUrl: './bootb.component.html',
  styleUrls: ['./bootb.component.scss'],
})
export class BootbComponent implements OnInit, Screen {
  public selected = 0;
  public MainOption: ToolSettings = Boot;
  constructor() {}

  ngOnInit(): void {}
}
