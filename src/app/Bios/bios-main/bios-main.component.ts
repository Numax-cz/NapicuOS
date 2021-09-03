import { Component, OnInit } from '@angular/core';
import { MainInfo } from '../../Array/Informations';
import { BiosSettings } from '../../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../../interface/ComponentClass';
import { Informations } from '../../interface/Informations';
import { settings, ToolSettings } from '../../interface/ToolSettings';
import { setTimeInterval } from '../../Scripts/TimeController';
import { isTime } from '../../Scripts/Type';
@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit {
  constructor() {}

  public MainOption: ToolSettings = BiosSettings.Main;
  public MainOptionInfo: Informations[] = MainInfo;
  ngOnInit(): void {
    this.MainOption.settings.forEach((e: settings, i: number) => {
      if (isTime(e)) {
        setTimeInterval(this.MainOption.settings, i);
      }
      return;
    });
  }
}
