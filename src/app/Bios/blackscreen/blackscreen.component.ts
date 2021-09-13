import { Component, OnDestroy, OnInit } from '@angular/core';
import { checkBootDrive } from 'src/app/Scripts/bootloader/MainBootLoader';

@Component({
  selector: 'app-blackscreen',
  templateUrl: './blackscreen.component.html',
  styleUrls: ['./blackscreen.component.scss'],
})
export class BlackscreenComponent implements OnInit, OnDestroy {
  public static text: string[];
  public static animation: boolean;
  public static BigTextClass: boolean = false;
  constructor() {
    checkBootDrive();
  }

  ngOnInit(): void {
    BlackscreenComponent.BigTextClass = false;
  }
  ngOnDestroy(): void {
    BlackscreenComponent.BigTextClass = false;
  }

  get text(): any {
    return BlackscreenComponent.text;
  }
  get BigTextClass(): boolean {
    return BlackscreenComponent.BigTextClass;
  }
}
