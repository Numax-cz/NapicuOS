import {Component, forwardRef, OnInit} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {
  SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH, SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../config/System";


@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent {

  constructor() {
  }


  public formData = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(SYSTEM_USERS_MIN_PASSWORD_LENGTH),
      Validators.maxLength(SYSTEM_USERS_MAX_PASSWORD_LENGTH),
    ]),

    permission: new FormControl('', [
      Validators.required,
    ]),
  });

  public onButtonClick() {
    // if(this.formData.valid){
    //   let i = NapicuOS.add_user(new User({
    //     username: this
    //   }));
    // }
    console.log(this.formData.get("permission"))
  }

  get GetUsersPermission() {
    return Object.keys(SystemUserPermissionsEnumMetadata);
  }


}
