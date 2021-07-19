import { Directive } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Main } from '../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { Options, settings, ToolSettings } from '../interface/ToolSettings';

import { GetOptionsTime, GetOptionsTitle } from '../Scripts/GetOptionsTitle';

@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit, ComponentClass {
  constructor() {}
  public selected: number = 0;

  ngOnInit(): void {
    this.selected = 0;
  }

  public MainOption: settings[] = Main.settings;

  Options(o: settings): any {
    return (
      GetOptionsTitle(o) || GetOptionsTime(o) || BiosMainComponent.errorType()
    );
  }
  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }
  isString(val: any): boolean {
    return typeof val === 'string';
  }
  static errorType(): string {
    console.error('Array Error');
    return '{[Bios_Main]TYPE ERROR}';
  }
  //TOdo do píče to dát
  public isOption(component: settings, index: number): boolean {
    if (component.options[index] && component.options[index].title) {
      return true;
    }
    return false;
  }
  public isDate(component: settings, index: number): boolean {
    if (component.options[0] && component.options[0].date) {
      return true;
    }
    return false;
  }
}
