import { Component, OnInit } from '@angular/core';
import { Exit } from '../Array/ChooseSettings';
import { Main } from '../Array/ToolSettings';
import { ChoseSettings } from '../interface/ChoseSettings';
import { ComponentClass } from '../interface/ComponentClass';
import { Options, settings } from '../interface/ToolSettings';
import { GetOptionsTitle } from '../Scripts/GetOptionsTitle';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
})
export class ExitComponent implements OnInit, ComponentClass {
  public selected: number = 0;

  constructor() {}
  public MainOption: ChoseSettings[] = Exit;

  ngOnInit(): void {}

  public Options(o: settings): string {
    return GetOptionsTitle(o);
  }
}
