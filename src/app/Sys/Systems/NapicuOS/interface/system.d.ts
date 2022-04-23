import {Type} from '@angular/core';
import {windowButtonsMetadata, windowData} from './Window/windowData';
import {SystemWindowConstructorMetadata} from "./Window/window";
import {System} from "../SystemComponents/System";

export declare interface onStartUp {
  onStart(): void;
}

export declare interface onShutDown {
  onShutDown(): void;
}

export declare type SystemStringStateCorrection =
  SystemStateMetadata.StringCorrect
  | SystemStateMetadata.StringTooLong
  | SystemStateMetadata.StringTooShort;

export declare type SystemUserStateData =
  SystemStateMetadata.UserExists
  | SystemStateMetadata.UserNotExists
  | SystemStateMetadata.StringTooLong
  | SystemStateMetadata.StringTooShort;

export declare type SystemFileStateData =
  | SystemStateMetadata.FileAlreadyExists
  | SystemStateMetadata.FileAddedSuccess
  | SystemStateMetadata.DirNotExist
  | SystemStateMetadata.FileHasBadName;


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

export declare interface AppCreatMetadata {
  /**
   * Application's title
   */
  appTitle: string;
  /**
   * Application's process name
   */
  processTitle: string;
  /**
   * Application's component (GUI)
   */
  appComponent: Type<any>;
  /**
   * Window's settings (size & position)
   */
  windowData?: windowData;

  resizeAllowed?: boolean;

  /**
   * Application's file icon
   */
  fileIconPath?: string;

  windowButtons?: windowButtonsMetadata;

  addToDock?: boolean;

  multiRun?: boolean;
}

export declare interface AppCreatFileMetadata {
  /**
   * Application's title
   */
  appTitle: string;
  /**
   * Application's process name
   */
  processTitle: string;
  /**
   * Application's Window
   */
  appWindow: SystemWindowConstructorMetadata;
  /**
   * Application's file icon
   */
  fileIconPath?: string;

}

export declare const enum SystemStateMetadata {
  UserFailLogin = 3033,
  UserLoginSuccess = 3000,
  UserExists = 3030,
  UserNotExists = 3050,


  FileAlreadyExists = 1059,
  FileAddedSuccess = 1060,
  FileHasBadName = 1061,
  DirNotExist = 1058,
  DirExist = 1057,
  FileNotExist = 1051,
  FileOpenSuccess = 1050,


  RegisterCommandAlreadyExists = 9059,
  RegisterCommandSuccess = 9060,


  StringCorrect = 6900,
  StringTooShort = 6901,
  StringTooLong = 6902,
}


