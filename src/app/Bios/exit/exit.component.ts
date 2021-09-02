import { Component, OnInit } from '@angular/core';
import { BiosSettings } from 'src/app/Array/ToolSettings';
import { ToolSettings } from 'src/app/interface/ToolSettings';
import { Screen } from 'src/app/interface/Screen';
@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrls: ['./exit.component.scss'],
})
export class ExitComponent implements OnInit, Screen {
  public selected: number = 0;
  public MainOption: ToolSettings = BiosSettings.Exit;

  ngOnInit(): void {}
}
