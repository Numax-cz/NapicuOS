import { Component, OnInit } from '@angular/core';
import { BiosSettings } from '../../Array/ToolSettings';
import { ToolSettings } from '../../interface/ToolSettings';
import { Screen } from '../../interface/Screen';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit, Screen {
  public selected: number = 0;
  public MainOption: ToolSettings = BiosSettings.Tools;
  constructor() {}

  ngOnInit(): void {}
}
