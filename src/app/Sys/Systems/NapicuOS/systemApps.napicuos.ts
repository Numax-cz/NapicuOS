import { Process } from '../../Process';
import { ConsoleComponent } from './Apps/console/console.component';
import { WelcomeComponent } from './Apps/welcome/welcome.component';
import { NapicuOS } from './system.napicuos';
import { Window } from '../../Window';
import { throwIfEmpty } from 'rxjs';

export function initAllSystemApps() {
  napicu_os_time().install().run();

  napicu_os_welcomeapp().install().run().Window.open();

  napicu_os_terminal().install().run().Window.open();


  console.log(NapicuOS.get_installed_apps());
  
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
    onDock: true,
  });
}

export function napicu_os_welcomeapp(): Process {
  return new Process({
    Window: new Window(WelcomeComponent, 'NapicuOS - Setup'),
    processTitle: 'SetupAPP',
    onDock: true
  });
}

export function napicu_os_terminal(): Process {
  return new Process({
    Window: new Window(ConsoleComponent, 'Terminal'),
    processTitle: 'Terminal',
    onDock: true,
  });
}
