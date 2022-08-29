import { Component, OnInit } from '@angular/core';
import {NapicuOS} from "../../../system.napicuos";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public setDark(): void {
    NapicuOS.set_active_user_dark_theme();
  }

  public setWhite(): void {
    NapicuOS.set_active_user_white_theme();
  }
}
