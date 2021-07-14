import { Component, OnInit } from '@angular/core';
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

  public MainOption: Option[] = [
    {
      title: 'System Language',
      options: [
        {
          title: 'English',
          selected: true,
        },
        {
          title: 'Korea',
          selected: false,
        },
      ],
      id: 0,
    },
    {
      title: 'System Date',
      options: [
        {
          title: '{}',
          selected: true,
        },
      ],
      id: 1,
    },
  ];

  Options(o: Option): string {
    return OptionsSelected(o);
  }

  public Move(e: KeyboardEvent) {
    MoveOption(this, e.keyCode);

  }
  
  public OpenMenu(e: Option[]) {
    console.log(e);
    
  }

}
