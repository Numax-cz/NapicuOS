import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiosInfo } from '../../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { startTimeIn, startTimeOut } from '../../Config/Animation/Boot';
import { FlashComponent } from '../flash/flash.component';
import * as key from 'src/app/Config/KeyMaps';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit, OnDestroy {
  public static EnterBios: boolean;

  /**
   * Defines whether a black screen is displayed
   */
  public static BlackScreen: boolean = false;

  protected BiosBootAudio: HTMLAudioElement = new Audio('/assets/sound/Boot.wav');
  constructor(@Inject(DOCUMENT) private doc: Document, private router: Router) {}

  ngOnInit(): void {
    this.ClearRouter();
    BootComponent.EnterBios = false;
    FlashComponent.ezFlashWindow = false;
    this.setEvents();
    if (BootComponent.BlackScreen) {
      setTimeout(() => {
        BootComponent.BlackScreen = false;
      }, startTimeOut);
    } else {
      BootComponent.BlackScreen = false;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.RunBios, true);
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.RunBios, true);
    window.addEventListener('keydown', this.RunBios, true);
  }

  protected PlayBootSound(): void {
    this.BiosBootAudio.play();
  }

  public RunBios = (e: KeyboardEvent): void => {
    if (e.keyCode == key.Delete || e.keyCode == key.F2) {
      if (!BootComponent.BlackScreen) {
        setTimeout(() => {
          BootComponent.BlackScreen = true;
          setTimeout(() => {
            this.PlayBootSound();
            setTimeout(() => {
              this.router.navigate(['bios/main'] /*{ skipLocationChange: true } */);
            }, 150);
          }, startTimeIn);
        }, 280);
      }
    }
  };

  public ClearRouter(): void {
    BiosComponent.BiosRouter = this.router;
    BiosComponent.selected = 0;
    BootComponent.EnterBios = false;
  }

  get biosTitle(): string {
    return BiosInfo.title;
  }

  get BlackScreen(): boolean {
    return BootComponent.BlackScreen;
  }
}
