import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { wallpaper } from '../../config/wallpaper';

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
})
export class NapicuOSComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let now = new Date();
    var date = formatDate(now, 'MMM d h:mm a  ', 'en-US');
    console.log(date);
  }

  get wallpaper(): string {
    return wallpaper;
  }
}
