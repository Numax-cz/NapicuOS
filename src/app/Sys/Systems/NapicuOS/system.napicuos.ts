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
import { Command } from '../../command';
import { initAllCommands } from './initCommands.napicuos';
import { initAllSystemApps } from './systemApps.napicuos';
import { SystemFile } from '../../File';
import { systemDirMetadata } from './interface/FilesDirs/systemDir';
import { system_boot_screen_logo, system_boot_screen_title } from './config/systemInfo';

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;
  private static instaledApps: Process[] = [];
  private static files: systemDirMetadata[]= [];
  public static systemTime: string;
  public override boot = {
    title: system_boot_screen_title,
    logo: system_boot_screen_logo,
  };

  public override onStart(): void {
    this.SystemBoot();
  }

  public override onShutDown(): void {}

  protected setProcess(): void {
    initAllSystemApps();

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

  // * * * Getters * * *
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
   * Returns the command by name
   * @param processTitle The name of the command you want to search for
   */
  public static get_system_process_by_title(processTitle: string): Process {
    return this.get_system_process().filter((element: Process) => {
      return element.processTitle === processTitle;
    })[0];
  }
  /**
   * Return applications
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
   * Returns displayed windows
   */
  public static get_system_displayed_window_apps(): Process[] {
    return this.get_system_process().filter((element: Process) => {
      return element.Window?.display == true;
    });
  }
  /**
   * Returns non-displayed windows
   */
  public static get_system_no_displayed_window_apps(): Process[] {
    return this.get_system_process().filter((element: Process) => {
      return element.Window?.display == false;
    });
  }

  /**
   * Return activated window
   */
  public static get_system_activated_window_app(): Process {
    return this.get_system_displayed_window_apps().filter((element: Process) => {
      return element.Window?.activated == true;
    })[0];
  }
  /**
   * Returns available commands
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
  /**
   * Returns installed applications
   */
  public static get_installed_apps(): Process[] {
    return this.instaledApps;
  }
  /**
   * Returns apps in dock
   */
  public static get_apps_in_dock(): SystemFile[] {
    return [];
  }

  // * * * Functions * * *
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

  public static creat_app_runner(): void {}

  //TODO parameters
  public static async run_command(cmd: string, params?: string[]): Promise<void | Line[]> {
    var i: Command = NapicuOS.get_command_by_commandStr(cmd);
    var x: Process = NapicuOS.get_system_activated_window_app();
    if (!x) console.error('No window activated');
    if (i) {
      return await i.run(params, x);
    } else {
      return [new Line(`${cmd}: command not found`, 'red')];
    }
  }

  public static delete_command(cmd: string): any {
    //TODO Do this
  }
}
