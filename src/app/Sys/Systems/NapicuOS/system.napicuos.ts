import { BlackscreenComponent } from 'src/app/Bios/blackscreen/blackscreen.component';
import { GrubComponent } from 'src/app/System/grub/grub.component';
import { SystemComponent } from 'src/app/System/system/system.component';
import { onStartUp, onShutDown, Os } from './interface/system';
import { Process } from '../../Process';
import { System } from '../../System';
import { LoadsComponent } from './components/loads/loads.component';
import { NapicuOSComponent } from './components/napicu-os/napicu-os.component';
import { boot_animation_time, boot_time, soft_boot_time } from './config/boot';
import { formatDate } from '@angular/common';
import { time_formate } from './config/time';
import { Line } from './Apps/console/console.component';
import { Command, CommandFunMetadata } from '../../command';
import { initAllCommands } from './initCommands.napicuos';
import { initAllSystemApps } from './systemApps.napicuos';
import { SystemFile } from '../../File';
import { systemDirMetadata, systemDrivesMetadata } from './interface/FilesDirs/systemDir';
import { system_boot_screen_logo, system_boot_screen_title, system_default_user } from './config/systemInfo';
import { NapicuOSSystemDir, napicu_os_root_part } from './config/drive';
import { copy } from 'src/app/Scripts/DeepClone';
import { User } from '../../User';
import { CommandStateCodeMetadata } from './interface/Commands/commandsCodes';
import { LoginscreenComponent } from './components/loginscreen/loginscreen.component';

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public override component = NapicuOSComponent;
  private static drives: systemDrivesMetadata = NapicuOSSystemDir;
  private static users: User[] = [];
  private static activeUser: User;
  public static systemTime: string;
  public override boot = {
    title: system_boot_screen_title,
    logo: system_boot_screen_logo,
  };

  public override onStart(): void {
    //TODO Login & root creat
    // NapicuOS.activeUser = system_default_user;
    this.SystemBoot();
  }

  public override onShutDown(): void {}

  protected init(): void {
    initAllSystemApps();
    initAllCommands();
  }

  public SystemBoot(): void {
    //? This is the main place to load all necessary processes
    this.init();

    SystemComponent.SysComponent = LoadsComponent;
    setTimeout(() => {
      SystemComponent.SysComponent = BlackscreenComponent;
      if (NapicuOS.activeUser) {
        setTimeout(() => {
          SystemComponent.SysComponent = this.component;
          setTimeout(() => {
            this.load();
          }, boot_animation_time + 100);
        }, soft_boot_time);
      } else {
        SystemComponent.SysComponent = LoginscreenComponent
      }
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
  public static get_available_commands(): SystemFile[] {
    return this.get_cmd_dir()?.files || [];
  }
  /**
   * Returns the command classes by specified command name
   * @param commandName Name of command/commands
   * @returns Array of commands
   */
  public static get_command_by_command_name(commandName: string): SystemFile[] {
    var i: SystemFile[] = [];
    i = this.get_available_commands().filter((element: SystemFile) => {
      var p = element.value as Command;
      return p.commandName === commandName;
    });
    return i;
  }

  /**
   * Returns the command class by specified command
   * @param command command
   * @returns Command class
   */
  public static get_command_by_commandStr(command: string): SystemFile {
    var i: SystemFile[] = [];
    i = this.get_available_commands().filter((element: SystemFile) => {
      var p = element.value as Command;
      return p.command === command;
    });
    return i[0];
  }
  /**
   * Returns root directory
   */
  public static get_root_dir(): systemDirMetadata {
    return this.drives[napicu_os_root_part];
  }
  /**
   * Returns main home directory
   */
  public static get_home_dir(): systemDirMetadata | undefined {
    return this.get_root_dir().dir?.['home'];
  }
  /**
   * Returns main apps directory
   */
  public static get_apps_dir(): systemDirMetadata | undefined {
    return this.get_root_dir().dir?.['usr'];
  }
  /**
   * Returns main bin directory
   */
  public static get_cmd_dir(): systemDirMetadata | undefined {
    return this.get_root_dir().dir?.['bin'];
  }

  /**
   * Returns apps in dock
   */
  public static get_apps_in_dock(): SystemFile[] {
    return [];
  }
  /**
   * Returns all system users
   */
  public static get_users(): User[] {
    return this.users;
  }
  /**
   * Returns the logged-in user.
   */
  public static get_active_user(): User {
    return this.activeUser;
  }

  // * * * Functions * * *
  /**
   * Register the command
   */
  public static register_command(cmd: Command): void {
    this.get_cmd_dir()?.files?.push(
      new SystemFile({ value: cmd, fileName: cmd.commandName, fileType: 'executable' })
    );
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    // var i: boolean = false;
    // for (let index = 0; index < Command.commands.length; index++) {
    //   const element = Command.commands[index];
    //   if (element.command == cmd.command) {
    //     i = true;
    //   }
    // }
    // if (!i) {

    // } else {
    //   console.warn(`The ${cmd.command} command is already registered`);
    // }
  }

  public static creat_app_runner(): void {}

  public static install_app(file: SystemFile): void {}

  //TODO parameters
  public static async run_command(cmd: string, params?: string[]): Promise<CommandFunMetadata> {
    var i: Command = NapicuOS.get_command_by_commandStr(cmd)?.value as Command;
    var x: Process = NapicuOS.get_system_activated_window_app();
    if (i) {
      return await i.run(params, x);
    } else {
      return {
        linesForCMD: [new Line(`${cmd}: command not found`, 'red')],
        stateCode: CommandStateCodeMetadata.CommandNotFound,
      };
    }
  }

  public static log_user(user: string): void {}

  /**
   * Create and add users
   * @param username New user's username
   * @param password New user's password
   */
  public static creat_user(username: string, password: string): void {
    //TODO return
    NapicuOS.run_command('adduser', [username, password]);
  }
  /**
   * Add user
   */
  public static add_user(user: User): void {
    this.users.push(user);
  }

  public static delete_command(cmd: string): any {
    //TODO Do this
  }
}
