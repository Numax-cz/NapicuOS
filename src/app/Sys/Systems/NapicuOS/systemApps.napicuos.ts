import { Process } from '../../Process';
import { ConsoleComponent } from './Apps/console/console.component';
import { WelcomeComponent } from './Apps/welcome/welcome.component';
import { NapicuOS } from './system.napicuos';
import { Window } from '../../Window';

export function initAllSystemApps() {
  napicu_os_time();

  napicu_os_welcomeapp();
  napicu_os_terminal().Window.open();
}

function napicu_os_time(): Process {
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

function napicu_os_welcomeapp(): Process {
  return new Process({
    Window: new Window(WelcomeComponent, 'NapicuOS - Setup'),
    processTitle: 'SetupAPP',
  });
}

function napicu_os_terminal(): Process {
  return new Process({
    Window: new Window(ConsoleComponent, 'Terminal'),
    processTitle: 'Terminal',
  });
}
