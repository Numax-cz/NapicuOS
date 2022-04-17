import {Type} from "@angular/core";


export declare interface welcomeUserInstallationDataMetadata {
  user: string;
  password: string;
}

export declare interface SystemInstallationOptionsMetadata {
  [index: string]: {
    component: Type<any>
    data?: any,
    success: boolean
  }
}

