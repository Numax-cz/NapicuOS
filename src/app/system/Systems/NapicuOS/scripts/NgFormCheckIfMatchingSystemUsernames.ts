import {FormGroup} from "@angular/forms";
import {NapicuOS} from "../system.napicuos";
import {SystemStateMetadata} from "../interface/System";

export function NgFormCheckIfMatchingSystemUsernames(): any {
  return (group: FormGroup) => {
    if(NapicuOS.check_username(group.value) !== SystemStateMetadata.UserNotExists) return {match: true}
    return group.setErrors(null);
  }
}
