import {DOCUMENT} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BiosInfo, setBiosSettings} from '../../ToolSettings';
import {BiosComponent} from '../bios/bios.component';
import {FlashComponent} from '../flash/flash.component';
import {KeyMaps} from 'src/app/bios/config/KeyMaps';
import {Navigate} from 'src/app/bios/Scripts/BiosRouter';
import {Boot} from 'src/app/bios/Scripts/exit/Boot';
import {setBiosSettingsFromCookies} from 'src/app/bios/Scripts/setBiosSettings';
import {setLanguage} from 'src/app/bios/config/BiosMenuList';
import {boot_configuration} from "../../config/bootloader";


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
  public static allowCookies: boolean | null = null;
  public static cookiesOptionPopUp: boolean = true;

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
    if(BootComponent.allowCookies !== null) this.startBooting();
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
    if (BootComponent.allowCookies == null){
      if(e.keyCode == 13) this.selectCookiesOption(BootComponent.cookiesOptionPopUp);
      else if(e.keyCode == 37) BootComponent.cookiesOptionPopUp = true;
      else if (e.keyCode == 39) BootComponent.cookiesOptionPopUp = false;
    }
  };

  public ClearRouter(): void {
    BiosComponent.BiosRouter = this.router;
    BiosComponent.selected = 0;
    BootComponent.EnterBios = false;
  }

  public selectCookiesOption(value: boolean){
    BootComponent.cookiesOptionPopUp = value;
    BootComponent.allowCookies = value;
    this.startBooting();
  }

  protected setEvents(): void {
    window.removeEventListener('keydown', this.RunBios, true);
    window.addEventListener('keydown', this.RunBios, true);
  }

  protected startBooting(): void {
    setTimeout(() => {
      if (!BootComponent.EnterBios) Boot();
    }, boot_configuration.exitTime);
  }

  protected PlayBootSound(): void {
    this.BiosBootAudio.play();
  }

  get GetAllowCookiesWindow(): boolean | null {
    return BootComponent.allowCookies;
  }

  get GetOptionCookiesWindow(): boolean  {
    return BootComponent.cookiesOptionPopUp;
  }
}
