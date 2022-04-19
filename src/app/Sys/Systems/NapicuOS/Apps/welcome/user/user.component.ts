import {Component, OnInit} from '@angular/core';
import {
  SystemInstallationOptionsMetadata,
  WelcomeComponentMetadata,
  welcomeUserInstallationDataMetadata
} from "../../../interface/Apps/welcome";
import {WelcomeComponent} from "../welcome.component";
import {WelcomeComponentClass} from "../WelcomeComponentClass";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit {

  public isUsernameValid: boolean = false;
  public isPasswordValid: boolean = false;
  public isPasswordConfirmValid: boolean = false;
  public isComputerNameValid: boolean = false;

  public data: welcomeUserInstallationDataMetadata = {
    userName: null, password1: null, password2: null, computerName: null
  };


  ngOnInit(): void {
  }


  public GetConfig(): SystemInstallationOptionsMetadata {
    return WelcomeComponent.systemInstallationOptions;
  }
}
