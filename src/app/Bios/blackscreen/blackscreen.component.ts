import { keyframes } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as key from 'src/app/Config/KeyMaps';

@Component({
  selector: 'app-blackscreen',
  templateUrl: './blackscreen.component.html',
  styleUrls: ['./blackscreen.component.scss'],
})
export class BlackscreenComponent implements OnInit {
  public static text: string[];
  public static animation: boolean;
  constructor() {}

  ngOnInit(): void {}

  public Move = (e: KeyboardEvent): void => {
    if (e.keyCode == key.F2) {
      
    }
  };

  get text(): any {
    return BlackscreenComponent.text;
  }
}
