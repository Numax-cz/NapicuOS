import { Component, OnDestroy, OnInit } from '@angular/core';
import { checkBootDrive } from 'src/app/Scripts/bootloader/MainBootLoader';

@Component({
  selector: 'app-blackscreen',
  templateUrl: './blackscreen.component.html',
  styleUrls: ['./blackscreen.component.scss'],
})
export class BlackscreenComponent implements OnInit {
  public static text: string[];
  public static animation: boolean;
  constructor() {
    checkBootDrive();
  }

  ngOnInit(): void {}

  get text(): any {
    return BlackscreenComponent.text;
  }
}
