import {FormGroup} from "@angular/forms";
import {NapicuOS} from "../system.napicuos";
import {User} from "../SystemComponents/User";

export function NgFormCheckIfMatchingSystemUsernames(): any {
  return (group: FormGroup) => {
    let sys_users: string[] = NapicuOS.get_users().map((user: User) => {return user.username});
    for (let i = 0; i < sys_users.length; i++) {
      if (group.value.toLowerCase() === sys_users[i].toLowerCase()) return {match: true};
    }
    return group.setErrors(null);
  }
}
