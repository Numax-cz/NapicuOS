import {Process} from './SystemComponents/Process';
import {ConsoleComponent} from './Apps/console/console.component';
import {WelcomeComponent} from './Apps/welcome/welcome.component';
import {NapicuOS} from './system.napicuos';
import {Window} from "./SystemComponents/Window";
import {UsermanagerComponent} from "./Apps/usermanager/usermanager.component";
import {FileComponent} from "./Apps/file/file.component";

export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {
  // NapicuOS.open_app("InstallNapicuOS");
  NapicuOS.open_app("FileManager");
  //NapicuOS.open_app("Terminal");

  // NapicuOS.open_app("UserManager");
}

//Before the user is logged in
export function installAllApps(): void {
  napicu_os_terminal();
  napicu_os_welcomeapp();
  napicu_os_user_manager();
  napicu_os_file();
}


export function napicu_os_time(): Process {
  return new Process({
    processTitle: 'SystemTime',
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
    processTitle: 'InstallNapicuOS',
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
    processTitle: 'UserManager',
    appComponent: UsermanagerComponent,
    windowData: Window.centerPos(25, 32),
    resizeAllowed: false,
    fileIconPath: '/assets/systems/NapicuOS/user.png',
    addToDock: false,
    multiRun: true
  });
}

export function napicu_os_terminal(): void {
  return NapicuOS.install_app({
    appTitle: 'Terminal',
    processTitle: 'Terminal',
    appComponent: ConsoleComponent,
    windowData: Window.centerPos(35, 35),
    fileIconPath: '/assets/systems/NapicuOS/SystemIcons/XFD/term.svg',
    addToDock: true,
  });
}

export function napicu_os_file(): void {
  return NapicuOS.install_app({
    appTitle: 'File',
    processTitle: 'FileManager',
    appComponent: FileComponent,
    windowData: Window.centerPos(75, 75),
    resizeAllowed: true,
    fileIconPath: '/assets/systems/NapicuOS/user.png',
    addToDock: true,
  });
}
