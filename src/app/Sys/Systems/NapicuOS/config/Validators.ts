import {FormControl, Validators} from "@angular/forms";
import {
  SYSTEM_DEFAULT_HOSTNAME,
  SYSTEM_HOSTNAME_MAX_LENGTH,
  SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_USERS_MAX_LENGTH,
  SYSTEM_USERS_MIN_LENGTH
} from "./System";
import {NgFormCheckIfMatchingSystemUsernames} from "../scripts/NgFormCheckIfMatchingSystemUsernames";

export const SYSTEM_VALIDATORS_USERNAME = () =>  new FormControl<string> ("",{ validators: [
    Validators.required,
    Validators.minLength(SYSTEM_USERS_MIN_LENGTH),
    Validators.maxLength(SYSTEM_USERS_MAX_LENGTH),
    NgFormCheckIfMatchingSystemUsernames()
  ], nonNullable: true});

export const SYSTEM_VALIDATORS_HOSTNAME = () => new FormControl<string>(SYSTEM_DEFAULT_HOSTNAME, { validators: [
    Validators.required,
    Validators.minLength(SYSTEM_HOSTNAME_MIN_LENGTH),
    Validators.maxLength(SYSTEM_HOSTNAME_MAX_LENGTH),
  ], nonNullable: true});
