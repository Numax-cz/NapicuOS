import {Component, OnInit} from '@angular/core';
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SYSTEM_DEFAULT_HOSTNAME,
  SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../../config/System";
import {NgFormCheckIfMatchingPasswords} from '../../../scripts/NgFormMatchingPasswords';

import {WelcomeUserForm, welcomeUserInstallationDataMetadata} from "../../../interface/Apps/Welcome";
import {NapicuOS} from "../../../system.napicuos";
import {WelcomeComponent} from "../welcome.component";
import {User} from "../../../SystemComponents/User";
import {SYSTEM_VALIDATORS_HOSTNAME, SYSTEM_VALIDATORS_USERNAME} from "../../../config/Validators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata> implements OnInit {

  public formData = new FormGroup<WelcomeUserForm>({
    username: SYSTEM_VALIDATORS_USERNAME(),
    hostname: SYSTEM_VALIDATORS_HOSTNAME(),

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
    let i =this.formData.get("username");
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

  get GetNextButtonText(): string{
    return NapicuOS.get_language_words().other.next;
  }

  get GetBackButtonText(): string{
    return NapicuOS.get_language_words().other.back;
  }

  get GetUsernameText(): string{
    return NapicuOS.get_language_words().other.your_username
  }

  get GetHostNameText(): string{
    return NapicuOS.get_language_words().other.your_hostname;
  }

  get GetChosePasswordText(): string{
    return NapicuOS.get_language_words().other.chose_pass;
  }

  get GetConfirmPasswordText(): string{
    return NapicuOS.get_language_words().other.confirm_pass;
  }

  get GetCreatNewUserText(): string {
    return NapicuOS.get_language_words().other.creat_new_user;
  }

}

