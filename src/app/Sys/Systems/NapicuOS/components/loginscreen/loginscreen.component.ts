import { Component, OnInit } from '@angular/core';
import { wallpaper } from '../../config/wallpaper';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss', '../napicu-os/napicu-os.component.scss'],
})
export class LoginscreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  get wallpaper(): string {
    return wallpaper;
  }
}
