import { Component, OnInit } from '@angular/core';
import { NoBootDevice } from 'src/app/Config/BlackScreenText';

@Component({
  selector: 'app-blackscreen',
  templateUrl: './blackscreen.component.html',
  styleUrls: ['./blackscreen.component.scss'],
})
export class BlackscreenComponent implements OnInit {
  public static text: string[];
  constructor() {}

  ngOnInit(): void {}
  get text(): any {
    return BlackscreenComponent.text;
  }
}
