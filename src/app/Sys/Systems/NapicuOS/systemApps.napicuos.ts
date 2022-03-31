import {Process} from '../../Process';
import {ConsoleComponent} from './Apps/console/console.component';
import {WelcomeComponent} from './Apps/welcome/welcome.component';
import {NapicuOS} from './system.napicuos';
import {Window} from "../../Window";
import {NapicuDate} from "../../Date";

export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {


  // NapicuOS.open_app("InstallNapicuOS");
  NapicuOS.open_app("Terminal");
  NapicuOS.open_app("Terminal");
  NapicuOS.open_app("Terminal");
}

//Before the user is logged in
export function installAllApps(): void {

  napicu_os_terminal();
  napicu_os_welcomeapp();


  let i = new NapicuDate();
  console.log(i.format("yyyy HH:mm"));
}


export function napicu_os_time(): Process {
  return new Process({
    processTitle: 'SystemTime',
    processInterval: {
      fun: () => {
        NapicuOS.update_time();
        NapicuOS.update_calendar();
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
