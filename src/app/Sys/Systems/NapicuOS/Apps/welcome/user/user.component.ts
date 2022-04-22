import {Component, OnInit} from '@angular/core';
import {
  SystemInstallationOptionsMetadata,
  welcomeUserInstallationDataMetadata
} from "../../../interface/Apps/welcome";
import {WelcomeComponent} from "../welcome.component";
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SYSTEM_DEFAULT_HOSTNAME, SYSTEM_HOSTNAME_MAX_LENGTH, SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../../config/system";
import {NgFormCheckIfMatchingPasswords} from '../../../scripts/NgFormMatchingPasswords';
import {LOG_SCREEN_ANIMATION_TIME} from "../../../config/logscreen";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends WelcomeComponentClass<FormGroup> implements OnInit {


  public data = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    ]),

    computerName: new FormControl(this.GetDefaultHostName(), [
      Validators.required,
      Validators.minLength(SYSTEM_HOSTNAME_MIN_LENGTH),
      Validators.maxLength(SYSTEM_HOSTNAME_MAX_LENGTH),
    ]),

    passwords: new FormGroup(
      {
        pass1: new FormControl('', [
          Validators.required,
          Validators.minLength(SYSTEM_USERS_MIN_PASSWORD_LENGTH),
          Validators.maxLength(SYSTEM_USERS_MAX_PASSWORD_LENGTH),
        ]),
        pass2: new FormControl('', []),
      },
      {validators: NgFormCheckIfMatchingPasswords('pass1', 'pass2')}
    ),
  });

  ngOnInit(): void {
  }

  checkData(): void {

  }

  checkSubmit(): boolean {
    return this.data.valid;
  }

  public GetDefaultHostName(): string {
    return SYSTEM_DEFAULT_HOSTNAME;
  }
}
