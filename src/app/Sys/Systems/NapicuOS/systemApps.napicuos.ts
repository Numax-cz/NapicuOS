import { Process } from '../../Process';
import { ConsoleComponent } from './Apps/console/console.component';
import { WelcomeComponent } from './Apps/welcome/welcome.component';
import { NapicuOS } from './system.napicuos';
import { Window } from '../../Window';
import { SystemFile } from '../../File';

export function initAllSystemProcess(): void {
  napicu_os_time().install().runAsSystem();
}

export function initAllStartUpApps(): void {
  napicu_os_terminal().install().run().Window.open();
  
  


  if (!NapicuOS.systemData.instaled) {
    napicu_os_welcomeapp().install().run().Window.open();
  }
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

export function napicu_os_welcomeapp(): Process {
  return new Process({
    Window: new Window(WelcomeComponent, 'Installer'),
    processTitle: 'Install NapicuOS',
  });
}

export function napicu_os_terminal(): Process {
  return new Process({
    Window: new Window(ConsoleComponent, 'Terminal'),
    processTitle: 'Terminal',
  });
}
