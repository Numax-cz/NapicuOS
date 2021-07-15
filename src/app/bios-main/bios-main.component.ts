import { Component, OnInit } from '@angular/core';
import { MainOption } from '../Array/MainOption';
import { BiosSettings } from '../interface/BiosSettings';
import { ComponentOption } from '../interface/ComponentOption';
import { SettingsOptions } from '../interface/SettingsOptions';
import { OptionsSelected } from '../Scripts/Option';
@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit, BiosSettings {
  constructor() {}
  public selected: number = 1;
  ngOnInit(): void {
    this.selected = 0;
  }

  public MainOption: ComponentOption[] = MainOption;

  Options(o: ComponentOption): string {
    return OptionsSelected(o);
  }
}
