import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { boot_animation_time } from '../../config/boot';
import { wallpaper } from '../../config/wallpaper';

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
})
export class NapicuOSComponent implements OnInit {
  public time: string;
  constructor() {
    this.time = this.GetTime();
    
  }
  ngOnInit(): void {}
  
  private GetTime(): string {
    let now = new Date();
    return formatDate(now, 'MMM d, h:mm a  ', 'en-US'); //TODO Settings
  }
  get wallpaper(): string {
    return wallpaper;
  }
  get animationBootTime(): number{
    return boot_animation_time;
  }
}
