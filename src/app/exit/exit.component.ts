import { Component, OnInit } from '@angular/core';
import { ComponentClass } from '../interface/ComponentClass';
import { settings, ToolSettings } from '../interface/ToolSettings';
import { Screen } from '../interface/Screen';
import { BiosSettings } from '../Array/ToolSettings';
@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
})
export class ExitComponent implements OnInit, Screen {
  public selected: number = 0;
  public MainOption: ToolSettings = BiosSettings.Exit;

  constructor() {}

  ngOnInit(): void {}
}
