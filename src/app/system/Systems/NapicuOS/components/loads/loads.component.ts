import {Component} from '@angular/core';
import {GrubComponent} from 'src/app/grub/grub/grub.component';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.scss'],
  animations: [
    trigger('NapicuOSfeoreLoading', [
      transition(':enter', [
        style({opacity: 0}),
        animate(1400, style({opacity: 1})),
      ]),

    ]),
  ]
})
export class LoadsComponent {

  constructor() {
  }


  get GetImg(): string {
    let logo = GrubComponent.GrubActiveSystem.boot.logo;
    if (logo) {
      return logo;
    }
    return '';
  }

  get GetText(): string {
    return GrubComponent.GrubActiveSystem.boot.title;
  }
}
