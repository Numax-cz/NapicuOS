import { Component, OnInit } from '@angular/core';
import { Boot } from '../Array/ToolSettings';
import { ComponentClass } from '../interface/ComponentClass';
import { settings, ToolSettings } from '../interface/ToolSettings';
import { isOption, isTime, isDate } from '../Scripts/Type';

@Component({
  selector: 'app-bootb',
  templateUrl: './bootb.component.html',
  styleUrls: ['./bootb.component.scss'],
})
export class BootbComponent implements OnInit, ComponentClass {
  public selected = 0;
  public MainOption: ToolSettings = Boot;
  constructor() {}

  ngOnInit(): void {}

  public isOption(component: settings, index: number): boolean {
    return isOption(component, index);
  }
  public isTime(component: settings): boolean {
    return isTime(component);
  }
  public isDate(component: settings): boolean {
    return isDate(component);
  }
}
