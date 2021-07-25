import { Directive } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Main } from '../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import {
  Options,
  settings,
  Time,
  ToolSettings,
} from '../interface/ToolSettings';
import { isTime, isOption, isDate } from '../Scripts/Type';

@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit, ComponentClass {
  constructor() {}
  public selected: number = 0;
  public MainOption: settings[] = Main.settings;

  ngOnInit(): void {
    this.selected = 0;
    this.MainOption.forEach((e: settings, i: number) => {
      if (isTime(e)) {
        this.setTimeInterval(Main, i);
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

  public setTimeInterval(settings: ToolSettings, index: number) {
    if (!settings.settings[index].interval) {
      settings.settings[index].interval = setInterval(() => {
        //* Seconds
        var second = Number(settings.settings[index].time[2].title) + 1;
        
        //settings.settings[index].time[2].title =
        //! RULES
      }, 1000);
    }
  }
}
