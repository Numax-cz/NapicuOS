import {Component, OnInit} from '@angular/core';
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SYSTEM_DEFAULT_HOSTNAME, SYSTEM_HOSTNAME_MAX_LENGTH, SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../../config/System";
import {NgFormCheckIfMatchingPasswords} from '../../../scripts/NgFormMatchingPasswords';

import {
  SystemInstallationOptionsArrayBinds,
  welcomeUserInstallationDataMetadata
} from "../../../interface/Apps/Welcome";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit {


  public override bindArrayName: SystemInstallationOptionsArrayBinds = "User";

  public formData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    ]),

    hostname: new FormControl(this.GetDefaultHostName(), [
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

  override checkSubmit(): boolean {
    return this.formData.valid;
  }

  public submit(): void | welcomeUserInstallationDataMetadata {
    return {
      username: this.formData.value.userName,
      password: this.formData.value.passwords.pass1,
      hostname: this.formData.value.hostname,
    }
  }

  public GetDefaultHostName(): string {
    return SYSTEM_DEFAULT_HOSTNAME;
  }
}

