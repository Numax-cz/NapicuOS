import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { log_screen_animation_time } from '../../config/logscreen';
import { wallpaper } from '../../config/wallpaper';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss', '../napicu-os/napicu-os.component.scss'],
  animations: [
    trigger('NapicuOSfeoreLoginScreen', [
      transition('* => *', [
        query(
          ':self',
          stagger('20ms', [
            style({ transform: 'translateY(-75%)', opacity: 0, transformOrigin: 'bottom' }),
            animate(`${log_screen_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginscreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  get wallpaper(): string {
    return wallpaper;
  }
}
