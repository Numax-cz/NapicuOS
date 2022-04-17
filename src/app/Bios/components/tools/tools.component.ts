import {Component, OnInit} from '@angular/core';
import {BiosSettings} from '../../ToolSettings';
import {ToolSettings} from '../../interface/ToolSettings';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  public MainOption: ToolSettings = BiosSettings.Tools;

  constructor() {
  }

  ngOnInit(): void {
  }
}
