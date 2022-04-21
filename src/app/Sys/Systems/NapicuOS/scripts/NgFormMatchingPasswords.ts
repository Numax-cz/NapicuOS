import {FormGroup} from "@angular/forms";

/**
 * @author RemyaJ
 * @link https://stackoverflow.com/questions/43487413/password-and-confirm-password-field-validation-angular2-reactive-forms
 * @param {string} passwordKey - Main password
 * @param  {string} passwordConfirmationKey - authentication password
 * @returns {ValidationErrors} ValidationErrors
 */
export function NgFormCheckIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string): any {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey],
      passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true});
    } else {
      return passwordConfirmationInput.setErrors(null);
    }
  }
}
