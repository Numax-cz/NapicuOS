import {Component, OnInit} from '@angular/core';
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SYSTEM_DEFAULT_HOSTNAME,
  SYSTEM_HOSTNAME_MAX_LENGTH,
  SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_USERS_MAX_LENGTH,
  SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../../config/System";
import {NgFormCheckIfMatchingPasswords} from '../../../scripts/NgFormMatchingPasswords';

import {
  SystemInstallationOptionsArrayBinds,
  WelcomeUserForm,
  welcomeUserInstallationDataMetadata
} from "../../../interface/Apps/Welcome";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit {


  public override bindArrayName: SystemInstallationOptionsArrayBinds = "User";

  public formData = new FormGroup<WelcomeUserForm>({
    username: new FormControl<string> ("",{ validators: [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    ], nonNullable: true }),

    hostname: new FormControl<string>(this.GetDefaultHostName(), { validators: [
      Validators.required,
      Validators.minLength(SYSTEM_HOSTNAME_MIN_LENGTH),
      Validators.maxLength(SYSTEM_HOSTNAME_MAX_LENGTH),
    ], nonNullable: true}),

    passwords: new FormGroup({
        pass1: new FormControl('', { validators: [
          Validators.required,
          Validators.minLength(SYSTEM_USERS_MIN_PASSWORD_LENGTH),
          Validators.maxLength(SYSTEM_USERS_MAX_PASSWORD_LENGTH),
        ], nonNullable: true}),
        pass2: new FormControl('', {validators: [], nonNullable: true}),
      },
      {validators: NgFormCheckIfMatchingPasswords('pass1', 'pass2')}
    )
  })

  ngOnInit(): void {
  }

  override checkSubmit(): boolean {
    return this.formData.valid;
  }

  public submit(): welcomeUserInstallationDataMetadata {
    return {
      username: this.formData.value.username,
      password: this.formData.value.passwords?.pass1,
      hostname: this.formData.value.hostname,
    }
  }

  public GetDefaultHostName(): string {
    return SYSTEM_DEFAULT_HOSTNAME;
  }
}

