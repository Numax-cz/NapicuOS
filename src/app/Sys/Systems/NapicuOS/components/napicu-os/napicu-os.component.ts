import { trigger, transition, query, stagger, style, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { systemProcess } from 'src/app/Sys/interface/systemProcess';
import { GrubComponent } from 'src/app/System/grub/grub.component';
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
            style({ transform: 'scale(0.2)', opacity: 0, transformOrigin: 'bottom' }),
            animate(`${boot_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
  ],
})
export class NapicuOSComponent implements OnInit {
  public time: string;
  constructor() {
    this.time = this.GetTime();
  }
  ngOnInit(): void {}

  private GetTime(): string {
    let now = new Date();
    return formatDate(now, 'MMM d, h:mm a  ', 'en-US'); //TODO Settings
  }
  get wallpaper(): string {
    return wallpaper;
  }
  get SystemBoot(): boolean {
    return GrubComponent.ActiveSystem.SystemBooted;
  }
  get ProcessComponents(): systemProcess[] {
    return GrubComponent.ActiveSystem.SystemProcess;
  }
}
