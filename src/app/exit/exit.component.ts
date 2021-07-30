import { Component, OnInit } from '@angular/core';
import { Exit } from '../Array/ToolSettings';
import { ComponentClass } from '../interface/ComponentClass';
import { settings, ToolSettings } from '../interface/ToolSettings';
import { Screen } from '../interface/Screen';
@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
})
export class ExitComponent implements OnInit, Screen {
  public selected: number = 0;
  public MainOption: ToolSettings = Exit;

  constructor() {}

  ngOnInit(): void {}
}
