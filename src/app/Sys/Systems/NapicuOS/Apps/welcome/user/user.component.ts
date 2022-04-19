import {Component, OnInit} from '@angular/core';
import {
  SystemInstallationOptionsMetadata,
  welcomeUserInstallationDataMetadata
} from "../../../interface/Apps/welcome";
import {WelcomeComponent} from "../welcome.component";
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../../config/system";
import {checkIfMatchingPasswords} from "../../../scripts/NgFormCheckerPassword";

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

  public welcomeAppUserForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    ]),
    computerName: new FormControl('', [Validators.required, Validators.email]),

    passwords: new FormGroup(
      {
        pass1: new FormControl('', [
          Validators.required,
          Validators.minLength(SYSTEM_USERS_MIN_PASSWORD_LENGTH),
          Validators.maxLength(SYSTEM_USERS_MAX_PASSWORD_LENGTH),
        ]),
        pass2: new FormControl('', []),
      },
      {validators: checkIfMatchingPasswords('pass1', 'pass2')}
    ),
  });


  ngOnInit(): void {
  }


  public GetConfig(): SystemInstallationOptionsMetadata {
    return WelcomeComponent.systemInstallationOptions;
  }
}
