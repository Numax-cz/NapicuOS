import { Component, OnDestroy, OnInit } from '@angular/core';

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

  get text(): any {
    return BlackscreenComponent.text;
  }
}
