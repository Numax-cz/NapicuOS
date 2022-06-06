import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";
import {FormControl} from "@angular/forms";

export interface UserManagerForm{
  username: FormControl<string>;
  password: FormControl<string>;
  permission: FormControl<SystemUserPermissionsEnumMetadata>;
}
