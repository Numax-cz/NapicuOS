import {Type} from '@angular/core';
import {ProcessWindowValueMetadata} from 'src/app/Sys/Process';
import {systemAlertTypeEnumMetadata} from './Alert/alert';
import {windowButtonsMetadata, windowData} from './Window/windowData';
import {SystemWindowConstructorMetadata} from "./Window/window";

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

  FileAlreadyExists = 1059,
  FileAddedSuccess = 1060,
  DirNotExist = 1059,
  FileNotExist = 1051,
  FileOpenSuccess = 1050,

  RegisterCommandAlreadyExists = 9059,
  RegisterCommandSuccess = 9060,
}
