import {Process} from '../../Process';
import {ConsoleComponent} from './Apps/console/console.component';
import {WelcomeComponent} from './Apps/welcome/welcome.component';
import {NapicuOS} from './system.napicuos';
import {SystemFile} from '../../File';
import {systemAlertTypeEnumMetadata} from './interface/Alert/alert';

export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {
  //napicu_os_welcomeapp().open();
  napicu_os_terminal().open();
  NapicuOS.create_alert({
    alertTitle: 'Alert',
    alertValue: 'Tohle je alert',
    alertType: systemAlertTypeEnumMetadata.Info,
  }).open()
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

export function napicu_os_welcomeapp(): SystemFile {
  return NapicuOS.create_app({
    appTitle: 'Installer',
    processTitle: 'Install NapicuOS',
    appComponent: WelcomeComponent,
  });
}

export function napicu_os_terminal(): SystemFile {
  return NapicuOS.create_app({
    appTitle: 'Terminal',
    processTitle: 'Terminal',
    appComponent: ConsoleComponent,
  });
}
