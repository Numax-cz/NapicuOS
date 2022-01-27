import { Type } from '@angular/core';

export declare interface onStartUp {
  onStart(): void;
}

export declare interface onShutDown {
  onShutDown(): void;
}

export declare interface Os {
  component: Type<any>;
  boot: {
    title: string;
    logo: string;
  };
}

export declare interface systemData {
  installed: boolean;
}

export declare const enum SystemStateMetadata {
  UserFailLogin = 3033,
  UserLoginSuccess = 3000,

  FileAlreadyExists = 1059,
  FileAddedSuccess = 1060,
  DirNotExist = 1050,

  RegisterCommandAlreadyExists = 9059,
  RegisterCommandSuccess = 9060,
}
