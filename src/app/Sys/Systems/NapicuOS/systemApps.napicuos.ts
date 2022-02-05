import {Process} from '../../Process';
import {ConsoleComponent} from './Apps/console/console.component';
import {WelcomeComponent} from './Apps/welcome/welcome.component';
import {NapicuOS} from './system.napicuos';
import {SystemFile} from '../../File';
import {systemAlertTypeEnumMetadata} from './interface/Alert/alert';
import {Window} from "../../Window";
import {AppCreatMetadata} from "./interface/system";

export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {
}

export function installAllApps(): void {
  napicu_os_welcomeapp();
  napicu_os_terminal();

}


export function napicu_os_time(): Process {
  return new Process({
    processTitle: 'SystemTime',
    processInterval: {
      fun: () => {
        NapicuOS.systemTime = NapicuOS.getTime();
      },
      time: 1000,
    },
  });
}

export function napicu_os_welcomeapp(): SystemFile | null {
  return NapicuOS.create_app({
    appTitle: ' ',
    processTitle: 'InstallNapicuOS',
    appComponent: WelcomeComponent,
    windowData: Window.centerPos(75, 75),
    resizeAllowed: false,
    fileIconPath: '/assets/systems/NapicuOS/Logo.svg'
  });
}

export function napicu_os_terminal(): SystemFile | null {
  return NapicuOS.create_app({
    appTitle: 'Terminal',
    processTitle: 'Terminal',
    appComponent: ConsoleComponent,
  });
}
