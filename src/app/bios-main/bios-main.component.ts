import { Component, OnInit } from '@angular/core';
import { Option } from '../interface/Option';
import { OptionsSelected } from '../Option';
@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit {
  constructor() {}
  static selected: number = 1;
  ngOnInit(): void {
    BiosMainComponent.selected = 0;
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

  get selected(): number {
    return BiosMainComponent.selected;
  }
}
