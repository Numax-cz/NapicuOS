import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiosInfo } from '../../Array/ToolSettings';
import { BiosComponent } from '../bios/bios.component';
import { exitTime, startTimeIn, startTimeOut } from '../../Config/Animation/Boot';
import { FlashComponent } from '../flash/flash.component';
import * as key from 'src/app/Config/KeyMaps';
import { Navigate } from 'src/app/Scripts/BiosRouter';
import { Boot } from 'src/app/Scripts/exit/Boot';
import { setBiosSettings } from 'src/app/Scripts/setBiosSettings';

@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit, OnDestroy {
  public static EnterBios: boolean;

  protected BiosBootAudio: HTMLAudioElement = new Audio('/assets/sound/Boot.wav');
  constructor(@Inject(DOCUMENT) private doc: Document, private router: Router) {}

  ngOnInit(): void {
    setBiosSettings();
    this.ClearRouter();
    BootComponent.EnterBios = false;
    FlashComponent.ezFlashWindow = false;
    this.setEvents();
    setTimeout(() => {
      if (!BootComponent.EnterBios) {
        Boot();
      }
    }, exitTime);
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
      BootComponent.EnterBios = true;
      setTimeout(() => {
        Navigate('/blackloading');
        setTimeout(() => {
          this.PlayBootSound();
          setTimeout(() => {
            this.router.navigate(['bios/main'] /*{ skipLocationChange: true } */);
          }, 150);
        }, startTimeIn);
      }, 280);
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
}
