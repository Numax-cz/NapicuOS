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
  WelcomeUserForm,
  welcomeUserInstallationDataMetadata
} from "../../../interface/Apps/Welcome";
import {NapicuOS} from "../../../system.napicuos";
import {WelcomeComponent} from "../welcome.component";
import {User} from "../../../SystemComponents/User";
import {WelcomeThemeComponent} from "../theme/theme.component";
import {NapicuOSComponent} from "../../../components/napicu-os/napicu-os.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit {

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
    let username = this.formData.value.username;
    let password = this.formData.value.passwords?.pass1;
    let hostname = this.formData.value.hostname;

    if (username && password){
      WelcomeComponent.userCache = new User({
        username: username,
        password: password,
        userSetting: NapicuOS.get_active_user()?.userSetting
      })
    }
    return {
      username: username,
      password: password,
      hostname: hostname,
    }
  }

  public GetDefaultHostName(): string {
    return SYSTEM_DEFAULT_HOSTNAME;
  }

  public GetUsernameError(): boolean {
    let i =this.formData.get("username")
    return !i?.valid && !!i?.value.length;
  }

  public GetMainPasswordError(): boolean {
    let i =this.formData.get("passwords")?.get("pass1")
    return !i?.valid && !!i?.value.length;
  }

  public GetPasswordError(): boolean {
    let i =this.formData.get("passwords")
    return !i?.valid && !!i?.get("pass1")?.value.length && !!i?.get("pass2")?.value.length
  }
}

