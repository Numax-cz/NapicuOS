import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";
import {SYSTEM_WALLPAPERS} from "../../../config/System";

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss']
})
export class WallpaperComponent implements OnInit {

  constructor() { }

  public declare system_wallpapers: string[];


  ngOnInit(): void {
    this.system_wallpapers = Object.values(SYSTEM_WALLPAPERS);
  }

  get GetActiveWallpaper(): string {
    return NapicuOS.get_active_user_wallpaper();
  }


  public setWallpaper(name: string): void {
    NapicuOS.set_wallpaper(name);
  }


}
