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

export declare const enum SystemStateMetadata {
  UserFailLogin = 3033,
  UserLoginSucces = 3000,
}
