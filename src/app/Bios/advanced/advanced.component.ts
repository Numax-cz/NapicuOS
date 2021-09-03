import { Component, OnInit } from '@angular/core';
import { BiosSettings } from 'src/app/Array/ToolSettings';
import { ToolSettings } from 'src/app/interface/ToolSettings';
import { Informations } from 'src/app/interface/Informations';
@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent implements OnInit {
  public MainOption: ToolSettings = BiosSettings.Advanced;

  constructor() {}

  ngOnInit(): void {}
}
