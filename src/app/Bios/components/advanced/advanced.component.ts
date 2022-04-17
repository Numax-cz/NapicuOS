import {Component, OnInit} from '@angular/core';
import {BiosSettings} from 'src/app/Bios/ToolSettings';
import {ToolSettings} from 'src/app/Bios/interface/ToolSettings';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent implements OnInit {
  public MainOption: ToolSettings = BiosSettings.Advanced;

  constructor() {
  }

  ngOnInit(): void {
  }
}
