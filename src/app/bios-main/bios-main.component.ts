import { Component, OnInit } from '@angular/core';
import { MainInfo } from '../Array/Informations';
import { Main } from '../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { Informations } from '../interface/Informations';
import { Options, settings, Time, ToolSettings } from '../interface/ToolSettings';
import { setTimeInterval, TimeInterval } from '../Scripts/TimeController';
import { isTime, isOption, isDate } from '../Scripts/Type';

@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit, ComponentClass {
  constructor() {}
  public selected: number = 0;
  public MainOption: ToolSettings = Main;
  public MainOptionInfo: Informations[] = MainInfo;
  ngOnInit(): void {
    this.selected = 0;
    this.MainOption.settings.forEach((e: settings, i: number) => {
      if (isTime(e)) {
        setTimeInterval(this.MainOption.settings, i);
      }
      return;
    });
  }

  get Selected(): number {
    return BiosComponent.WindowSelectedOption;
  }

  get CursorDisplay(): boolean {
    return BiosComponent.WindowFastOptionDisplay;
  }

  static errorType(): string {
    console.error('Array Error');
    return '{[Bios_Main]TYPE ERROR}';
  }

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
