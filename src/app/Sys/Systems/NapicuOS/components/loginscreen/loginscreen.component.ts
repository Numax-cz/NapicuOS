import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {SystemComponent} from 'src/app/Grub/system/system.component';
import {LOG_SCREEN_ANIMATION_TIME} from '../../config/logscreen';
import {SystemStateMetadata} from '../../interface/system';
import {NapicuOS} from '../../system.napicuos';
import {NapicuOSComponent} from '../napicu-os/napicu-os.component';
import {KeyMaps} from "../../../../../Bios/Config/KeyMaps";
import {SYSTEM_WALLPAPER} from "../../config/system";

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: [
    './loginscreen.component.scss',
    '../napicu-os/napicu-os.component.scss',
  ],
  animations: [
    trigger('NapicuOSfeoreLoginScreen', [
      transition('* => *', [
        query(
          ':self',
          stagger('20ms', [
            style({
              transform: 'translateY(-75%)',
              opacity: 0,
              transformOrigin: 'bottom',
            }),
            animate(`${LOG_SCREEN_ANIMATION_TIME}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginscreenComponent implements OnInit, OnDestroy {
  public declare username: string;
  public declare password: string;
  public isErrorLogin: boolean = false;

  constructor() {
  }

  get wallpaper(): string {
    return SYSTEM_WALLPAPER;
  }

  ngOnInit(): void {
    this.setEvents();
  }

  ngOnDestroy() {
    window.removeEventListener("keydown", this.onEnter, true);
  }

  protected onEnter = (e: KeyboardEvent) => {
    if (e.keyCode === KeyMaps.Enter) {
      this.login();
    }
  }

  public login(): void {
    let x = NapicuOS.log_user(this.username, this.password);

    if (x === SystemStateMetadata.UserLoginSuccess) {
      this.isErrorLogin = false;
      SystemComponent.SystemComponent = NapicuOSComponent;
    } else if (x === SystemStateMetadata.UserFailLogin) {
      this.isErrorLogin = true;
    } else {
      //TODO
    }
  }

  private setEvents() {
    window.addEventListener('keydown', this.onEnter, true);
  }
}
