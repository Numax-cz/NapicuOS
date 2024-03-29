import {Component, OnInit} from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";
import {SYSTEM_WALLPAPERS} from "../../../config/System";
import {Interval} from "../../../scripts/Interval";
import {imagePreloader} from "../../../scripts/ImagePreloader";


@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss']
})
export class WallpaperComponent  implements OnInit {
  public declare system_wallpapers: string[];
  public wallpaper_url: string = "";
  public interval_input: Interval = new Interval();
  public error_input: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.system_wallpapers = Object.values(SYSTEM_WALLPAPERS);
    if(NapicuOS.get_active_user_wallpaper_index() < 0) this.wallpaper_url =  NapicuOS.get_active_user_wallpaper();
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

  public onChangeURL(): void {
    this.error_input = false;
    if(this.wallpaper_url.length){
      this.interval_input.delay(() => {
        imagePreloader(this.wallpaper_url).then(
          s => {
            this.setWallpaper(this.wallpaper_url);
          },
          e => {
            this.error_input = true;
          }
        )
      });
    }
  }

  public setURLText(): void {
    if(NapicuOS.get_active_user_wallpaper_index() < 0) this.wallpaper_url =  NapicuOS.get_active_user_wallpaper();
    else this.wallpaper_url = "";

    this.error_input = false;
  }

  public setWallpaper(name: string): void {
    NapicuOS.set_wallpaper(name);
  }
}
