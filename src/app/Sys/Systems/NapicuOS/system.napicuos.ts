import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { SystemComponent } from 'src/app/System/system/system.component';
import { onStartUp, onShutDown, Os } from './interface/system';
import { Process } from '../../Process';
import { System } from '../../System';
import { WelcomeComponent } from './Apps/welcome/welcome.component';
import { LoadsComponent } from './components/loads/loads.component';
import { NapicuOSComponent } from './components/napicu-os/napicu-os.component';
import { boot_animation_time, boot_time, soft_boot_time } from './config/boot';
import { Window } from '../../Window';
import { formatDate } from '@angular/common';
import { time_formate } from './config/time';
import { ConsoleComponent, Line } from './Apps/console/console.component';
import { Command } from '../../Command';
import { initAllCommands } from './initCommands.napicuos';

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;

  public static systemTime: string;
  public override boot = {
    title: 'NapicuOS',
    logo: 'assets/systems/NapicuOS/logo.webp',
  };

  public override onStart(): void {
    this.SystemBoot();
  }

  public override onShutDown(): void {}

  protected setProcess(): void {
    new Process({
      processTitle: 'SystemTime',
      processInterval: {
        fun: () => {
          NapicuOS.systemTime = NapicuOS.getTime();
        },
        time: 1000,
      },
    });

    new Process({
      Window: new Window(WelcomeComponent, 'NapicuOS - Setup'),
      processTitle: 'SetupAPP',
    }).Window.open();

    new Process({
      Window: new Window(ConsoleComponent, 'Terminal'),
      processTitle: 'Terminal',
    }).Window.open();

    initAllCommands();
  }

  public SystemBoot(): void {
    //? This is the main place to load all necessary processes
    this.setProcess();

    SystemComponent.SysComponent = LoadsComponent;
    setTimeout(() => {
      SystemComponent.SysComponent = BlackscreenComponent;
      setTimeout(() => {
        SystemComponent.SysComponent = this.component;
        setTimeout(() => {
          this.load();
        }, boot_animation_time + 100);
      }, soft_boot_time);
    }, boot_time);
  }

  public override onKeyPress(ev: KeyboardEvent) {}

  public override onLoad(): void {}

  public static getTime(): string {
    let now = new Date();
    return formatDate(now, time_formate, 'en-US'); //TODO Settings
  }

  //? * * * Getters * * *
  /**
   * Returns system time
   */
  public static get_system_time(): string {
    return this.systemTime;
  }
  /**
   * Returns whether the system has been started
   */
  public static get_system_boot(): boolean {
    return GrubComponent.ActiveSystem.SystemBooted;
  }
  /**
   * Returns if the system dock is displayed
   */
  public static get_system_bottom_dock_display(): boolean {
    return NapicuOSComponent.BottomDockDisplay;
  }
  /**
   * Returns the system processes
   */
  public static get_system_process(): Process[] {
    return GrubComponent.ActiveSystem.SystemProcess;
  }
  /**
   * Returns applications that can be run in gui mode
   */
  public static get_system_window_apps(): Process[] {
    var process = this.get_system_process();
    var array: Process[] = [];
    for (let i = 0; i < process.length; i++) {
      if (process[i]?.Window) {
        array.push(process[i]);
      }
    }
    return array;
  }
  /**
   * Returns the displayed windows
   */
  public static get_system_displayed_window_apps(): Process[] {
    return this.get_system_process().filter((element: Process) => {
      return element.Window?.display == true;
    });
  }

  /**
   * Return the activated window
   */
  public static get_system_activated_window_app(): Process {
    return this.get_system_displayed_window_apps().filter((element: Process) => {
      return element.Window?.activated == true;
    })[0];
  }

  /**
   * Returns the available commands
   */
  public static get_available_commands(): Command[] {
    return Command.commands;
  }

  /**
   * Returns the command classes by specified command name
   * @param commandName Name of command/commands
   * @returns Array of commands
   */
  public static get_command_by_command_name(commandName: string): Command[] {
    var i: Command[] = [];
    i = this.get_available_commands().filter((element: Command) => {
      return element.commandName === commandName;
    });
    return i;
  }

  /**
   * Returns the command class by specified command
   * @param command command
   * @returns Command class
   */
  public static get_command_by_commandStr(command: string): Command {
    var i: Command[] = [];
    i = this.get_available_commands().filter((element: Command) => {
      return element.command === command;
    });
    return i[0];
  }

  //? * * * Functions * * *
  /**
   * Register the command
   */
  public static register_command(cmd: Command): void {
    var i: boolean = false;
    for (let index = 0; index < Command.commands.length; index++) {
      const element = Command.commands[index];
      if (element.command == cmd.command) {
        i = true;
      }
    }
    if (!i) {
      Command.commands.push(cmd);
    } else {
      console.warn(`The ${cmd.command} command is already registered`);
    }
  }

  //TODO parameters
  public static async run_command(cmd: string, params?: string[]): Promise<void | Line[]> {
    var i: Command = NapicuOS.get_command_by_commandStr(cmd);
    if (i) {
      return await i.run(params);
    } else {
      return [new Line(`${cmd}: command not found`, 'red')];
    }
  }

  public static delete_command(cmd: string): any {
    //TODO Do this
  }
}
