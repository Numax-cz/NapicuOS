import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";
import {SYSTEM_WALLPAPERS} from "../../../config/System";
import {NapicuOSComponent} from "../../../components/napicu-os/napicu-os.component";

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

  get GetActiveWallpaperIndex(): number{
    return NapicuOS.get_active_user_wallpaper_index();
  }

  get GetCustomWallpaperText(): string{
    return NapicuOS.get_language_words().other.custom_wallpaper;
  }


  public setWallpaper(name: string): void {
    NapicuOS.set_wallpaper(name);
  }


}
