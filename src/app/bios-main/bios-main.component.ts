import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bios-main',
  templateUrl: './bios-main.component.html',
  styleUrls: ['./bios-main.component.scss'],
})
export class BiosMainComponent implements OnInit {
  constructor() {}
  static selected: number = 0;
  ngOnInit(): void {}

  public MainOption = [
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
  ];
  get OptionsSelected(): string {
    var ret: string = "null";
    this.MainOption[0].options.forEach((e: any) => {
      if (e.selected) {
        ret = e.title
        return;
      }
      
    });
    return ret;
  }
}
