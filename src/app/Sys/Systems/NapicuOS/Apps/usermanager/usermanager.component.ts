import {Component} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SystemStateMetadata} from "../../interface/System";
import {
  SYSTEM_USERS_MAX_LENGTH,
  SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH,
  SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../config/System";
import {NapicuOS} from "../../system.napicuos";
import {User} from "../../SystemComponents/User";
import {systemAlertImagesEnumMetadata} from "../../config/Alert";


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
    if (this.formData.valid) {
      let i = NapicuOS.add_user(new User({
        username: this.formData.get("username")?.value,
        password: this.formData.get("password")?.value,
        permissions: this.formData.get("permission")?.value,
      }));

      if (i === SystemStateMetadata.UserExists) {
        NapicuOS.alert("User Manager", "User already exists", systemAlertImagesEnumMetadata.Error);
      } else if (i === SystemStateMetadata.UserNotExists) {
        NapicuOS.alert("User Manager", "User added", systemAlertImagesEnumMetadata.Info);
      }
    }
  }

  get GetUsersPermission() {
    return Object.keys(SystemUserPermissionsEnumMetadata);
  }


}
