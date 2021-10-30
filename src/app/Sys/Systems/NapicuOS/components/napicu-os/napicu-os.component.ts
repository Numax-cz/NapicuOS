import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/Sys/Process';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { getSystemTime, SystemBoot } from '../../../GET';
import { boot_animation_time } from '../../config/boot';
import { wallpaper } from '../../config/wallpaper';

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
  animations: [
    trigger('NapicuOSfeoreStartUp', [
      transition('* => *', [
        query(
          ':self',
          stagger('20ms', [
            style({ transform: 'scale(0.2) rotateX(70deg)', opacity: 0, transformOrigin: 'bottom' }),
            animate(`${boot_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
  ],
})
export class NapicuOSComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  get systemTime(): string {
    return getSystemTime();
  }
  get wallpaper(): string {
    return wallpaper;
  }
  get SystemBoot(): boolean {
    return SystemBoot();
  }
  get ProcessComponents(): Process[] {
    return GrubComponent.ActiveSystem.SystemProcess;
  }
}
