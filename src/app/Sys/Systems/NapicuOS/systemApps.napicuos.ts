import {Process} from './SystemComponents/Process';
import {NapicuOS} from './system.napicuos';
import {SystemAppsProcessName} from "./config/Apps/AppsNames";
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";

import {AppCreatMetadata} from "./interface/System";
import {SYSTEM_INITS_APPS} from "./scripts/Decorators";
import {SystemAppsWelcome} from "./SystemComponents/Apps/Welcome";
import {SystemAppsFileManager} from "./SystemComponents/Apps/FileManager";
import {SystemAppsTerminal} from "./SystemComponents/Apps/Terminal";
import {SystemAppsUserManager} from "./SystemComponents/Apps/UserManager";
import {SystemAppsNotepad} from "./SystemComponents/Apps/Notepad";

export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {
  // NapicuOS.open_app("InstallNapicuOS");
  //NapicuOS.open_app("Terminal");

  // NapicuOS.open_app("UserManager");

  NapicuOS.run_command({
    cmd:  SystemCommandsPrefixEnum.openAppCommand,
    args: [SystemAppsProcessName.fileManager]
  });

}

//Before the user is logged in
export function installAllApps(): void {


  //TODO
  SYSTEM_INITS_APPS.forEach((app: AppCreatMetadata) => {
    NapicuOS.install_app(app)
    console.log(app)
  });
}


export function napicu_os_time(): Process {
  return new Process({
    processTitle: SystemAppsProcessName.systemTime,
    processInterval: {
      fun: () => {
        NapicuOS.update_time();
      },
      time: 1000,
    },
  });
}


export class NapicuApps {

  public static SystemAppTerminal(): Promise<any> {
    return new Promise(() => {
      new SystemAppsTerminal().run()?.Window.open();
    });
  }

  public static SystemAppWelcome(): Promise<any> {
    return new Promise(() => {
      new SystemAppsWelcome().run()?.Window.open();
    });
  }

  public static SystemAppFileManager(): Promise<any> {
    return new Promise((resolve) => {
      new SystemAppsFileManager(resolve).run()?.Window.open();
    });
  }

  public static SystemAppUserManager(): Promise<any> {
    return new Promise(() => {
      new SystemAppsUserManager().run()?.Window.open();
    });
  }

  public static SystemAppNotePad(): Promise<any>{
    return new Promise(() => {
      new SystemAppsNotepad().run()?.Window.open();
    });
  }
}
