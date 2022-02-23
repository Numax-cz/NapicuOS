import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {SystemComponent} from 'src/app/System/system/system.component';
import {log_screen_animation_time} from '../../config/logscreen';
import {wallpaper} from '../../config/wallpaper';
import {SystemStateMetadata} from '../../interface/system';
import {NapicuOS} from '../../system.napicuos';
import {NapicuOSComponent} from '../napicu-os/napicu-os.component';

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
            animate(`${log_screen_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginscreenComponent implements OnInit {
  public declare username: string;
  public declare password: string;
  public isErrorLogin: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  get wallpaper(): string {
    return wallpaper;
  }

  public login(): void {
    var x = NapicuOS.log_user(this.username, this.password);

    if (x === SystemStateMetadata.UserLoginSuccess) {
      this.isErrorLogin = false;
      SystemComponent.SysComponent = NapicuOSComponent;
    } else if (x === SystemStateMetadata.UserFailLogin) {
      this.isErrorLogin = true;
    } else {
      //TODO
    }
  }
}
