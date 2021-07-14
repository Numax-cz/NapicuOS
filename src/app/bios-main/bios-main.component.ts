import { Component, OnInit } from '@angular/core';
import { MainOption } from '../Array/MainOption';
import { BiosSettings } from '../interface/BiosSettings';
import { Option } from '../interface/Option';
import { MoveOption } from '../MoveOption';
import { OptionsSelected } from '../Option';
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

  public MainOption: Option[] = MainOption;

  Options(o: Option): string {
    return OptionsSelected(o);
  }

  public Move(e: KeyboardEvent) {
    MoveOption(this, e.keyCode);
  }

  public OpenMenu(option: Option[]) {}
}
