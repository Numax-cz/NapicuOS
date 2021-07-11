import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bios',
  templateUrl: './bios.component.html',
  styleUrls: ['./bios.component.scss'],
})
export class BiosComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public BiosMenu = [
    {
      title: 'Main',
      selected: true,
      id: 0,
    },
    {
      title: 'Ai Tweaker',
      selected: false,
      id: 1,
    },
    {
      title: 'Advanced',
      selected: false,
      id: 2,
    },
    {
      title: 'Power',
      selected: false,
      id: 3,
    },
    {
      title: 'Boot',
      selected: false,
      id: 4,
    },
    {
      title: 'Tools',
      selected: false,
      id: 5,
    },
    {
      title: 'Exit',
      selected: false,
      id: 6,
    },
  ];
}
