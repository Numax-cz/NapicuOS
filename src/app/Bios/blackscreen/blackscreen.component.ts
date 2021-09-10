import { Component, OnInit } from '@angular/core';
import { lang } from 'src/app/Array/ToolSettings';
import { NoBootDevice } from 'src/app/Config/BlackScreenText';
import { checkBootSector } from 'src/app/Scripts/CheckingBiosSettings';
import { setDisplayText } from 'src/app/Scripts/Stage/text';

@Component({
  selector: 'app-blackscreen',
  templateUrl: './blackscreen.component.html',
  styleUrls: ['./blackscreen.component.scss'],
})
export class BlackscreenComponent implements OnInit {
  public static text: string[];
  constructor() {
    checkBootSector();
  }

  ngOnInit(): void {}
  get text(): any {
    return BlackscreenComponent.text;
  }
}
