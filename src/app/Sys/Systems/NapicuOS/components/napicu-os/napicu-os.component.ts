import { Component, OnInit } from '@angular/core';
import { wallpaper } from '../../config/wallpaper';

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
})
export class NapicuOSComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get wallpaper(): string {
    return wallpaper;
  }
}
