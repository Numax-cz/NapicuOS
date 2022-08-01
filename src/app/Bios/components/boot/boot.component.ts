import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BiosInfo, setBiosSettings} from '../../ToolSettings';
import {BiosComponent} from '../bios/bios.component';
import {FlashComponent} from '../flash/flash.component';
import {KeyMaps} from 'src/app/Bios/Config/KeyMaps';
import {Navigate} from 'src/app/Bios/Scripts/BiosRouter';
import {Boot} from 'src/app/Bios/Scripts/exit/Boot';
import {setBiosSettingsFromCookies} from 'src/app/Bios/Scripts/setBiosSettings';
import {setLanguage} from 'src/app/Bios/Config/BiosMenuList';
import {boot_configuration} from "../../Config/bootloader";


@Component({
  selector: 'app-boot',
  templateUrl: './boot.component.html',
  styleUrls: ['./boot.component.scss'],
})
export class BootComponent implements OnInit, OnDestroy {
  public static EnterBios: boolean;
  public static NavigateRouter: Router;
  protected BiosBootAudio: HTMLAudioElement = new Audio(
    '/assets/sound/Boot.wav'
  );

  constructor(@Inject(DOCUMENT) private doc: Document, private router: Router) {
    BootComponent.NavigateRouter = this.router;
  }

  get biosTitle(): string {
    return BiosInfo.title;
  }

  ngOnInit(): void {
    setLanguage();
    setBiosSettings();
    setBiosSettingsFromCookies();
    this.ClearRouter();
    BootComponent.EnterBios = false;
    FlashComponent.ezFlashWindow = false;
    this.setEvents();
    setTimeout(() => {
      if (!BootComponent.EnterBios) {
        Boot();
      }
    }, boot_configuration.exitTime);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.RunBios, true);
  }

  public RunBios = (e: KeyboardEvent): void => {
    if (e.keyCode == KeyMaps.Delete || e.keyCode == KeyMaps.F2) {
      BootComponent.EnterBios = true;
      setTimeout(() => {
        Navigate('/blackloading');
        setTimeout(() => {
          this.PlayBootSound();
          setTimeout(() => {
            this.router.navigate(
              ['bios/main'] /*{ skipLocationChange: true } */
            );
          }, 150);
        }, boot_configuration.startTimeIn);
      }, 280);
    }
  };

  public ClearRouter(): void {
    BiosComponent.BiosRouter = this.router;
    BiosComponent.selected = 0;
    BootComponent.EnterBios = false;
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.RunBios, true);
    window.addEventListener('keydown', this.RunBios, true);
  }

  protected PlayBootSound(): void {
    this.BiosBootAudio.play();
  }
}
