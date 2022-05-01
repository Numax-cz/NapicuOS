import {Component, OnInit} from '@angular/core';
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SYSTEM_HOSTNAME_MAX_LENGTH,
  SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_USERS_MAX_LENGTH, SYSTEM_USERS_MAX_PASSWORD_LENGTH,
  SYSTEM_USERS_MIN_LENGTH, SYSTEM_USERS_MIN_PASSWORD_LENGTH
} from "../../config/System";
import {NgFormCheckIfMatchingPasswords} from "../../scripts/NgFormMatchingPasswords";

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent implements OnInit {

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

  });

  ngOnInit(): void {
  }


  get GetUsersPermission() {
    return Object.keys(SystemUserPermissionsEnumMetadata);
  }
}
