import {Component, OnInit} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemStateMetadata} from "../../interface/System";
import {SYSTEM_USERS_MAX_PASSWORD_LENGTH, SYSTEM_USERS_MIN_PASSWORD_LENGTH} from "../../config/System";
import {NapicuOS} from "../../system.napicuos";
import {User} from "../../SystemComponents/User";
import {systemAlertImagesEnumMetadata} from "../../config/Alert";
import {UserManagerForm} from "../../interface/Apps/UsermanagerForm";
import {SYSTEM_VALIDATORS_USERNAME} from "../../config/Validators";


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent implements OnInit{

  public declare verify: boolean;

  public declare badVerifyRoot: boolean;

  constructor() {
    this.verify = false;
    this.badVerifyRoot = false
  }

  public ngOnInit() {
  }


  public formData = new FormGroup<UserManagerForm>( {
    username: SYSTEM_VALIDATORS_USERNAME(),

    password: new FormControl<string>("", { validators: [
        Validators.required,
        Validators.minLength(SYSTEM_USERS_MIN_PASSWORD_LENGTH),
        Validators.maxLength(SYSTEM_USERS_MAX_PASSWORD_LENGTH),
      ], nonNullable: true }),

    permission: new FormControl<SystemUserPermissionsEnumMetadata>(SystemUserPermissionsEnumMetadata.User, { validators: [
      Validators.required,
    ], nonNullable: true})
  });

  public onButtonClick(): void {
    if (this.formData.valid) {
      let i = NapicuOS.add_user(new User({
        username: this.formData.value.username || "NULL",
        password: this.formData.value.password || "NULL",
        permissions: this.formData.value.permission,
      }));

      if (i === SystemStateMetadata.UserExists) {
        NapicuOS.alert("User Manager", "User already exists", systemAlertImagesEnumMetadata.Error);
      } else if (i === SystemStateMetadata.UserNotExists) {
        NapicuOS.alert("User Manager", "User added", systemAlertImagesEnumMetadata.Info);
      }
    }
  }

  public onButtonClickVerifyUser(password: string): void {
    if(NapicuOS.verify_root_password(password)){
      this.verify = true;
    }else this.badVerifyRoot = true;
  }

  public GetUsernameError(): boolean {
    let i =this.formData.get("username");
    return !i?.valid && !!i?.value.length;
  }

  public GetMainPasswordError(): boolean {
    let i =this.formData.get("password");
    return !i?.valid && !!i?.value.length;
  }

  get GetCheckSubmit(): boolean {
    return this.formData.valid;
  }

  get GetUsersPermission() {
    return Object.keys(SystemUserPermissionsEnumMetadata);
  }

  get GetVerifyText(): string {
    return NapicuOS.get_language_words().other.enter_root_pass;
  }

  get GetVerifyRootText(): string {
    return NapicuOS.get_language_words().other.verify_root_pass;
  }

  get GetBadPass(): string {
    return NapicuOS.get_language_words().other.pass_error;
  }


}
