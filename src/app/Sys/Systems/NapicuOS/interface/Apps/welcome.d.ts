import {Type} from "@angular/core";


export declare interface welcomeUserInstallationDataMetadata {
  userName: string | null,
  password1: string | null,
  password2: string | null,
  computerName: string | null,
}

export declare interface SystemInstallationOptionsMetadata {
  [index: string]: {
    component: Type<any>,
    data?: any,
    success: boolean,
  }
}

export declare interface WelcomeComponentMetadata<T> {
  welcomeComponentData: T | null,

  next(): void,

  back(): void,
}
