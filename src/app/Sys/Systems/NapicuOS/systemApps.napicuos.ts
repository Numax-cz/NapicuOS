import {Process} from '../../Process';
import {ConsoleComponent} from './Apps/console/console.component';
import {WelcomeComponent} from './Apps/welcome/welcome.component';
import {NapicuOS} from './system.napicuos';
import {SystemFile} from '../../File';
import {Window} from "../../Window";
import {SystemFileTypeEnumMetadata} from "./interface/FilesDirs/file";
import {SystemCommandsPrefixEnum} from "./interface/Commands/commands";

export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {


  NapicuOS.run_command(SystemCommandsPrefixEnum.openAppCommand, ['Terminal']);
  NapicuOS.run_command(SystemCommandsPrefixEnum.openAppCommand, ['Terminal']);

}

export function installAllApps(): void {
  napicu_os_terminal()


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
    appTitle: 'Installer',
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
    windowData: Window.centerPos(35, 35),

  });
}
