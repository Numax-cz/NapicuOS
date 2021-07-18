import { Component, OnInit } from '@angular/core';
import { Main } from '../Array/ToolSettings';
import { ComponentClass } from '../interface/ComponentClass';
import { Options, settings, ToolSettings } from '../interface/ToolSettings';

import { GetOptionsTitle } from '../Scripts/GetOptionsTitle';

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

  Options(o: settings): string {
    return GetOptionsTitle(o);
  }
}
