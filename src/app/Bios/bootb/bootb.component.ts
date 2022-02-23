import {Component, OnInit} from '@angular/core';
import {ToolSettings} from '../../interface/ToolSettings';
import {BiosSettings} from '../../Array/ToolSettings';

@Component({
  selector: 'app-bootb',
  templateUrl: './bootb.component.html',
  styleUrls: ['./bootb.component.scss'],
})
export class BootbComponent implements OnInit {
  public MainOption: ToolSettings = BiosSettings.Boot;

  constructor() {
  }

  ngOnInit(): void {
  }
}
