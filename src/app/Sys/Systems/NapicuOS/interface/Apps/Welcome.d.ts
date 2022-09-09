import {Type} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";


export declare interface welcomeUserInstallationDataMetadata {
  username: string | undefined,
  password: string | undefined,
  hostname: string | undefined
}

export declare interface welcomeItemsOptionMetadata{
  name: string,
  component: Type<any>
}

export declare interface SystemInstallationOptionsMetadata {
  component: Type<any>,
  data: any
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
