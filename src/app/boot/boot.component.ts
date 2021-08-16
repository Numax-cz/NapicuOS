import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiosInfo } from '../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { setTime } from '../Scripts/TimeDate';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit {
  public startTime: number = 2055;
  /**
   * Defines whether a black screen is displayed
   */
  public static BlackScreen: boolean = false;
  /**
   * True if the bios component is initialized
   * If true, the addEventListener function will not be executed
   */
  public static removeListener: boolean = false;
  protected BiosBootAudio: HTMLAudioElement = new Audio('/assets/sound/Boot.wav');
  constructor(@Inject(DOCUMENT) private doc: Document, private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => this.RunBios(e));
    BiosComponent.selected = 0;
    this.ClearRouter();
  }

  protected PlayBootSound(): void {
    this.BiosBootAudio.play();
  }

  public RunBios = (e: KeyboardEvent): void => {
    if (e.keyCode == 46 || e.keyCode == 113) {
      setTimeout(() => {
        BootComponent.BlackScreen = true;
        setTimeout(() => {
          this.PlayBootSound();
          setTimeout(() => {
            this.router.navigate(['bios/main'] /*{ skipLocationChange: true } */);
          }, 150);
        }, this.startTime);
      }, 280);
    }
  };

  public ClearRouter(): void {
    BiosComponent.BiosRouter = this.router;
  }

  get biosTitle(): string {
    return BiosInfo.title;
  }

  get BlackScreen(): boolean {
    return BootComponent.BlackScreen;
  }
}
