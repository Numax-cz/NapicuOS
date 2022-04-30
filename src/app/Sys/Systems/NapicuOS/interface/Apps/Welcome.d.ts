import {Type} from "@angular/core";


export declare interface welcomeUserInstallationDataMetadata {
  username: string,
  password: string,
  hostname: string
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
