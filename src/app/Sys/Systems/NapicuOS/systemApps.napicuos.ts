import {NapicuOS} from './system.napicuos';

import {AppCreatMetadata} from "./interface/System";
import {SYSTEM_INITS_APPS} from "./scripts/Decorators";
import {SystemAppsWelcome} from "./SystemComponents/Apps/Welcome";
import {SystemAppsFileManager} from "./SystemComponents/Apps/FileManager";
import {SystemAppsTerminal} from "./SystemComponents/Apps/Terminal";
import {SystemAppsUserManager} from "./SystemComponents/Apps/UserManager";
import {SystemAppsNotepad} from "./SystemComponents/Apps/Notepad";
import {SystemProcessTime} from "./SystemComponents/Process/Time";
import {FileManagerResponse} from "./interface/Apps/Response/FileManagerRes";
import {SystemAppsPaint} from "./SystemComponents/Apps/Paint";
import {SystemAppsFlappy} from "./SystemComponents/Apps/Flappy";
import {SystemAppsSettings} from "./SystemComponents/Apps/Settings";
import {SystemAppsCalculator} from "./SystemComponents/Apps/Calculator";
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";
import {SystemAppsProcessName} from "./config/Apps/AppsNames";

export function initAllSystemProcess(): void {
  new SystemProcessTime().process.runAsSystem();
}


//Before the user is logged in
export function installAllApps(): void {

  SYSTEM_INITS_APPS.forEach((app: AppCreatMetadata) => {
    NapicuOS.install_app(app)
    console.log(app)
  });
}

export function initAllStartUpApps(): void {

  //RUN FileManager
  NapicuOS.run_command({
    cmd:  SystemCommandsPrefixEnum.openAppCommand,
    args: [SystemAppsProcessName.calculator]
  });

}


//Applications
export class NapicuApps {
  public static SystemAppTerminal(args?: string[]): Promise<any> {
    return new Promise(() => {
      new SystemAppsTerminal().run()?.Window.open(args);
    });
  }

  public static SystemAppCalculator(args?: string[]): Promise<any> {
    return new Promise(() => {
      new SystemAppsCalculator().run()?.Window.open(args);
    });
  }

  public static SystemAppWelcome(args?: string[]): Promise<any> {
    return new Promise(() => {
      new SystemAppsWelcome().run()?.Window.open(args);
    });
  }

  public static SystemAppPaint(args?: string[]): Promise<any> {
    return new Promise(() => {
      new SystemAppsPaint().run()?.Window.open(args);
    });
  }

  public static SystemAppFlappy(args?: string[]): Promise<any> {
    return new Promise(() => {
      new SystemAppsFlappy().run()?.Window.open(args);
    });
  }

  public static SystemAppFileManager(args?: string[]): Promise<FileManagerResponse> {
    return new Promise((resolve) => {
      new SystemAppsFileManager(resolve).run()?.Window.open(args);
    });
  }

  public static SystemAppSettings(args?: string[]): Promise<FileManagerResponse> {
    return new Promise(() => {
      new SystemAppsSettings().run()?.Window.open(args);
    });
  }

  public static SystemAppUserManager(args?: string[]): Promise<any> {
    return new Promise(() => {
      new SystemAppsUserManager().run()?.Window.open(args);
    });
  }

  public static SystemAppNotePad(args?: string[]): Promise<any>{
    return new Promise(() => {
      new SystemAppsNotepad().run()?.Window.open(args);
    });
  }
}
