import {Type} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {SystemUserPermissionsEnumMetadata} from "../../config/UserPerms";


export declare interface welcomeUserInstallationDataMetadata {
  username: string | undefined,
  password: string | undefined,
  hostname: string | undefined
}

export declare interface SystemInstallationOptionsMetadata {

  component: Type<any>,
  data: any,

}

export declare type SystemInstallationOptionsArrayBinds = keyof SystemInstallationOptionsArrayMetadata;

export declare interface SystemInstallationOptionsArrayMetadata {
  Welcome: SystemInstallationOptionsMetadata,
  User: SystemInstallationOptionsMetadata
}


export declare interface WelcomeComponentMetadata<T> {
  welcomeComponentData: T | null,

  next(): void,

  back(): void,
}

export declare interface WelcomeUserForm{
  username: FormControl<string>;
  hostname: FormControl<string>;
  passwords: FormGroup<{
    pass1: FormControl<string>;
    pass2: FormControl<string>;
  }>;
}
