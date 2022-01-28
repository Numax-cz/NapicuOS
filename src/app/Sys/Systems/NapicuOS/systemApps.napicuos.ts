import { Process } from '../../Process';
import { ConsoleComponent } from './Apps/console/console.component';
import { WelcomeComponent } from './Apps/welcome/welcome.component';
import { NapicuOS } from './system.napicuos';
import { SystemFile } from '../../File';
import { AlertComponent } from './Apps/alert/alert.component';


export function initAllSystemProcess(): void {
  napicu_os_time().runAsSystem();
}

export function initAllStartUpApps(): void {

  //napicu_os_welcomeapp().open();
  napicu_os_terminal().open();
  napicu_os_alertwindow().open()

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
 return NapicuOS.create_app('Installer', 'Install NapicuOS', WelcomeComponent);
}

export function napicu_os_terminal(): SystemFile{
  return NapicuOS.create_app('Terminal', 'Terminal', ConsoleComponent);
}
 
export function napicu_os_alertwindow(): SystemFile{
  return NapicuOS.create_app('WindowAlert', 'WindowAlert', AlertComponent);
}