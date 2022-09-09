import { Component, OnInit } from '@angular/core';
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {welcomeUserInstallationDataMetadata} from "../../../interface/Apps/Welcome";
import {NapicuOS} from "../../../system.napicuos";
import {WelcomeComponent} from "../welcome.component";

@Component({
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class WelcomeThemeComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  checkSubmit(): boolean {
    return true;
  }

  submit(): void | welcomeUserInstallationDataMetadata {
    return undefined;
  }

  public setDark(): void {
    WelcomeComponent.userCache!.userSetting.theme.dark = true;
    NapicuOS.set_active_user_dark_theme();
  }

  public setWhite(): void {
    WelcomeComponent.userCache!.userSetting.theme.dark = false;
    NapicuOS.set_active_user_white_theme();
  }

  get getDarkTheme(): boolean{
    return WelcomeComponent.userCache?.userSetting.theme.dark || NapicuOS.get_active_user_dark_theme();
  }
}
