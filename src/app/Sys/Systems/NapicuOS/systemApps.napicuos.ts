import {Process} from './SystemComponents/Process';
import {ConsoleComponent} from './Apps/console/console.component';
import {WelcomeComponent} from './Apps/welcome/welcome.component';
import {NapicuOS} from './system.napicuos';
import {Window} from "./SystemComponents/Window";
import {UsermanagerComponent} from "./Apps/usermanager/usermanager.component";
import {FileComponent} from "./Apps/file/file.component";
import {SYSTEM_IMAGES} from "./config/System";
import {WordpadComponent} from "./Apps/wordpad/wordpad.component";
import {SystemAppsProcessName} from "./config/Apps/AppsNames";
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";

import {AppCreatMetadata} from "./interface/System";
import {SYSTEM_INITS_APPS} from "./scripts/Decorators";

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
  napicu_os_terminal();
  napicu_os_welcomeapp();
  napicu_os_user_manager();
  //napicu_os_file();
  napicu_os_notepad();


  //TODO
  SYSTEM_INITS_APPS.forEach((app: AppCreatMetadata) => {
    NapicuOS.install_app(app)
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

export function napicu_os_welcomeapp(): void {
  return NapicuOS.install_app({
    appTitle: 'Installer',
    processTitle: SystemAppsProcessName.installer,
    appComponent: WelcomeComponent,
    windowData: Window.centerPos(75, 75),
    resizeAllowed: false,
    fileIconPath: '/assets/systems/NapicuOS/Logo.svg',
    addToDock: true,
    multiRun: false
  });
}

export function napicu_os_user_manager(): void {
  return NapicuOS.install_app({
    appTitle: 'User Manager',
    processTitle: SystemAppsProcessName.userManager,
    appComponent: UsermanagerComponent,
    windowData: Window.centerPos(25, 32),
    resizeAllowed: false,
    fileIconPath: SYSTEM_IMAGES.User,
    addToDock: false,
    multiRun: true
  });
}

export function napicu_os_terminal(): void {
  return NapicuOS.install_app({
    appTitle: 'Terminal',
    processTitle: SystemAppsProcessName.terminal,
    appComponent: ConsoleComponent,
    windowData: Window.centerPos(35, 35),
    fileIconPath: SYSTEM_IMAGES.Term,
    addToDock: true,
  });
}

// export function napicu_os_file(): void {
//   return NapicuOS.install_app({
//     appTitle: 'File',
//     processTitle: SystemAppsProcessName.fileManager,
//     appComponent: FileComponent,
//     windowData: Window.centerPos(75, 75),
//     resizeAllowed: true,
//     fileIconPath: SYSTEM_IMAGES.BlueFolder,
//     addToDock: true,
//   });
// }

export function napicu_os_notepad(): void {
  return NapicuOS.install_app({
    appTitle: 'NotePad',
    processTitle: SystemAppsProcessName.note,
    appComponent: WordpadComponent,
    windowData: Window.centerPos(45, 45),
    resizeAllowed: true,
    fileIconPath: SYSTEM_IMAGES.AppDocText,
    addToDock: true,
  });
}
