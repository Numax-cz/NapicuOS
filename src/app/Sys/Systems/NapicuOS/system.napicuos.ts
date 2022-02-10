import {BlackscreenComponent} from 'src/app/Bios/blackscreen/blackscreen.component';
import {GrubComponent} from 'src/app/System/grub/grub.component';
import {SystemComponent} from 'src/app/System/system/system.component';
import {AppCreatMetadata, onShutDown, onStartUp, Os, SystemStateMetadata,} from './interface/system';
import {Process} from '../../Process';
import {System} from '../../System';
import {LoadsComponent} from './components/loads/loads.component';
import {NapicuOSComponent} from './components/napicu-os/napicu-os.component';
import {boot_time, soft_boot_time} from './config/boot';
import {formatDate} from '@angular/common';
import {time_formate} from './config/time';
import {Line} from './Apps/console/console.component';
import {Command, CommandFunMetadata} from '../../command';
import {initAllCommands} from './initCommands.napicuos';
import {initAllStartUpApps, initAllSystemProcess, installAllApps,} from './systemApps.napicuos';
import {SystemFile} from '../../File';
import {systemDirAFileMetadata, systemDrivesMetadata,} from './interface/FilesDirs/systemDir';
import {
  system_boot_screen_logo,
  system_boot_screen_title
} from './config/systemInfo';
import {napicu_os_root_part, NapicuOSSystemDir} from './config/drive';
import {User} from '../../User';
import {CommandStateCodeMetadata} from './interface/Commands/commandsCodes';
import {LoginscreenComponent} from './components/loginscreen/loginscreen.component';
import {SystemUserPermissionsEnumMetadata} from './interface/User/user';
import {SystemFileTypeEnumMetadata} from './interface/FilesDirs/file';
import {SystemAlert} from '../../Alert';
import {systemAlertTypeEnumMetadata} from "./interface/Alert/alert";
import {SystemCommandsPrefixEnum} from "./interface/Commands/commands";

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  private static drives: systemDrivesMetadata = NapicuOSSystemDir;
  private static users: User[] = [];
  private static activeUser: User | null;
  public static systemTime: string;
  public static systemData = {
    instaled: true,
  };
  public override boot = {
    title: system_boot_screen_title,
    logo: system_boot_screen_logo,
  };

  public override onStart(): void {
    //TODO Login & root creat
    this.SystemBoot();
  }

  public override onShutDown(): void {
  }

  public SystemBoot(): void {
    //? This is the main place to load all necessary processes

    //Initialization of all system processes
    initAllSystemProcess();
    //Initialize all system commands
    initAllCommands();
    //Initialize all system applications
    installAllApps();
    //Initialization of all users
    this.initUsers();


    SystemComponent.SysComponent = LoadsComponent;
    setTimeout(() => {
      SystemComponent.SysComponent = BlackscreenComponent;
      this.load();
      if (NapicuOS.activeUser) {
        setTimeout(() => {
          SystemComponent.SysComponent = NapicuOSComponent;
          // setTimeout(() => {

          // }, boot_animation_time + 100);
        }, soft_boot_time);
      } else {
        SystemComponent.SysComponent = LoginscreenComponent;
      }
    }, boot_time);
  }

  public override onLogin(): void {
    if (!NapicuOS.activeUser?.running) {
      initAllStartUpApps();
    }
  }

  public initUsers(): void {
    //Init Root user
    const system_root_user = new User(
      'root',
      'root',
      SystemUserPermissionsEnumMetadata.SuperUser
    );

    //Init default basic user
    const system_default_user = new User(
      'user',
      'napicuos',
      SystemUserPermissionsEnumMetadata.User
    );

    //Initialization of all users
    NapicuOS.add_user(system_default_user);
    //NapicuOS.add_user(system_root_user);

    //Automatic login of the default user
    NapicuOS.log_user(
      system_default_user.username,
      system_default_user.password
    );
  }

  public override onKeyPress(ev: KeyboardEvent) {
  }

  public override onLoad(): void {
  }

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
   * Returns the user processes
   * @param username User's name
   */
  public static get_user_process(username: string | undefined): Process[] {
    return this.get_system_process().filter((value: Process) => {
      return value.launchedBy === username;
    });
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
    let process = this.get_system_process();
    let array: Process[] = [];
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
    return this.get_system_displayed_window_apps().filter(
      (element: Process) => {
        return element.Window?.activated == true;
      }
    )[0];
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
    let i: SystemFile[] = [];
    i = this.get_available_commands().filter((element: SystemFile) => {
      let p = element.value as Command;
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
    let i: SystemFile[] = [];
    i = this.get_available_commands().filter((element: SystemFile) => {
      let p = element.value as Command;
      return p.command === command;
    });
    return i[0];
  }

  public static get_dir(): systemDrivesMetadata {
    return this.drives;
  }

  /**
   * Returns root directory
   */
  public static get_root_dir(): systemDirAFileMetadata {
    return this.get_dir()[napicu_os_root_part];
  }

  /**
   * Returns main home directory
   */
  public static get_home_dir(): systemDirAFileMetadata | undefined {
    return this.get_root_dir().dir?.['home'];
  }

  /**
   * Returns main apps directory
   */
  public static get_apps_dir(): systemDirAFileMetadata | undefined {
    return this.get_root_dir().dir?.['usr'];
  }

  /**
   * Returns main bin directory
   */
  public static get_cmd_dir(): systemDirAFileMetadata | undefined {
    return this.get_root_dir().dir?.['bin'];
  }

  /**
   * Returns apps in dock
   */
  public static get_apps_in_dock(): SystemFile[] {
    return this.get_active_user()?.userSetting.appsInDock || [];
  }

  /**
   * Returns process by process id
   * @param pid Process identifier
   */
  public static get_system_process_by_pid(pid: number): Process {
    return this.get_system_process()[pid];
  }

  /**
   * Returns all system users
   */
  public static get_users(): User[] {
    return this.users;
  }

  /**
   * Returns the user by username if the user exists
   * @param username Username of searched user
   */
  public static get_user(username: string): User | undefined {
    return this.users.filter((value: User) => {
      return value.username === username;
    })[0];
  }

  /**
   * Returns the logged-in user.
   */
  public static get_active_user(): User | null {
    return this.activeUser;
  }

  /**
   * Register the command
   */
  public static register_command(
    cmd: Command
  ):
    | SystemStateMetadata.RegisterCommandAlreadyExists
    | SystemStateMetadata.RegisterCommandSuccess {
    const commands = this.get_available_commands();
    let x = commands.filter((value: SystemFile) => {
      let x = value.value as Command;
      return x.command === cmd.command;
    });
    if (!x.length) {
      commands.push(
        new SystemFile({
          value: cmd,
          fileName: cmd.commandName,
          fileType: SystemFileTypeEnumMetadata.executable,
        })
      );
      return SystemStateMetadata.RegisterCommandSuccess;
    } else {
      return SystemStateMetadata.RegisterCommandAlreadyExists;
    }
  }

  /**
   * Executes the command
   * @param cmd Command prefix
   * @param params Input parameters
   */
  public static async run_command(
    cmd: string,
    params?: string[]
  ): Promise<CommandFunMetadata> {
    let i: SystemFile = NapicuOS.get_command_by_commandStr(cmd);
    let x: Process = NapicuOS.get_system_activated_window_app();
    if (i) {
      if (
        i.permissions.read ===
        SystemUserPermissionsEnumMetadata.SuperUser &&
        this.activeUser?.permissions !==
        SystemUserPermissionsEnumMetadata.SuperUser
      ) {
        return {
          linesForCMD: [new Line(`${cmd}: Permission denied`, 'red')],
          stateCode: CommandStateCodeMetadata.PermissionsError,
        };
      }
      return await i.open({params: params});
    } else {
      return {
        linesForCMD: [new Line(`${cmd}: command not found`, 'red')],
        stateCode: CommandStateCodeMetadata.CommandNotFound,
      };
    }
  }

  /**
   * Function that adds a file to the dock
   * @param file File to be added to the dock
   */
  public static add_file_to_dock(file: SystemFile): void {
    this.get_active_user()?.userSetting.appsInDock.push(file);
  }

  /**
   * Adds the file to the directory
   *
   * Checks if the same file name is in the directory
   * @param dir Directory to which the file should be added
   * @param file The file to be added to the directory
   */
  public static add_file_to_dir(
    dir: systemDirAFileMetadata | undefined,
    file: SystemFile
  ):
    | SystemStateMetadata.FileAlreadyExists
    | SystemStateMetadata.FileAddedSuccess
    | SystemStateMetadata.DirNotExist {
    if (dir?.files) {
      if (
        dir.files.filter((value: SystemFile) => {
          return value.fileName === file.fileName;
        })?.length
      ) {
        return SystemStateMetadata.FileAlreadyExists;
      }
      dir.files.push(file);
    } else {
      return SystemStateMetadata.DirNotExist;
    }
    return SystemStateMetadata.FileAddedSuccess;
  }

  /**
   * Opens a file in a specific directory
   * @param dir The directory in which you want to open the specific file
   * @param fileName The name of the file you want to open
   */
  public static open_file_in_dir(
    dir: systemDirAFileMetadata | undefined,
    fileName: string
  ):
    | SystemStateMetadata.DirNotExist
    | SystemStateMetadata.FileNotExist
    | SystemStateMetadata.FileOpenSuccess {

    let file = this.get_file_by_file_title(dir, fileName);
    if (file !== SystemStateMetadata.DirNotExist) {
      if (file !== SystemStateMetadata.FileNotExist) {
        //TODO Return Promise
        file.open();
        return SystemStateMetadata.FileOpenSuccess;
      }
      return SystemStateMetadata.FileNotExist;
    }
    return SystemStateMetadata.DirNotExist;
  }

  /**
   * Returns the file you are looking for
   * @param dir The directory in which you want to search for a specific file
   * @param fileName File name
   */
  public static get_file_by_file_title(dir: systemDirAFileMetadata | undefined, fileName: string):
    SystemFile
    | SystemStateMetadata.DirNotExist
    | SystemStateMetadata.FileNotExist {
    if (dir?.files) {
      let file = dir?.files.filter((value: SystemFile) => {
        return value.fileName === fileName;
      })[0];
      if (file) return file;
      return SystemStateMetadata.FileNotExist;
    }
    return SystemStateMetadata.DirNotExist
  }

  /**
   * Create and add users
   * @param username New user's username
   * @param password New user's password
   */
  public static create_user(username: string, password: string): void {
    //TODO return if the user exists
    NapicuOS.run_command('adduser', [username, password]);
  }

  /**
   * Launches the installed application
   * @param ApplicationProcessTitle Filename of the installed application (ProcessTitle)
   */
  public static open_app(ApplicationProcessTitle: string): void {
    NapicuOS.run_command(SystemCommandsPrefixEnum.openAppCommand, [ApplicationProcessTitle]);
  }

  /**
   * Add user
   */
  public static add_user(user: User): void {
    this.users.push(user);
  }

  /**
   * logs the user in
   * @param username User's name
   * @param password User's password
   */
  public static log_user(
    username: string,
    password: string
  ): SystemStateMetadata.UserFailLogin | SystemStateMetadata.UserLoginSuccess {
    let u = this.get_user(username);
    if (u && u.password === password) {
      this.activeUser = u;
    } else {
      return SystemStateMetadata.UserFailLogin;
    }
    GrubComponent.ActiveSystem.onLogin();
    if (NapicuOS.activeUser) NapicuOS.activeUser.running = true;
    return SystemStateMetadata.UserLoginSuccess;
  }

  /**
   * Creates and installs the application
   * @return {SystemFile} Application file
   */
  static install_app(data: AppCreatMetadata): void {
    let Application = new SystemFile({
      fileName: data.processTitle,
      fileType: SystemFileTypeEnumMetadata.apps,
      value: () => {
        return {
          appTitle: data.appTitle,
          processTitle: data.processTitle,
          appComponent: data.appComponent,
          windowData: data.windowData,
          resizeAllowed: data.resizeAllowed,
          fileIconPath: data.fileIconPath,
          windowButtons: data.windowButtons
        }
      },
      iconPath: data.fileIconPath,
    });

    if (this.add_file_to_dir(this.get_apps_dir(), Application) === SystemStateMetadata.FileAlreadyExists) {
      console.error("CreatAppFile Error - File already exists");
    }
    if (data.addToDock) User.defaultUserSettings.appsInDock.push(Application);
  }


  /**
   * Creates and opens a new system alert
   */
  public static alert(title: string, value: string, type: systemAlertTypeEnumMetadata): void {
    new Process({processTitle: 'SystemAlert', Window: new SystemAlert(title, value, type)}).runAsSystem().Window.open();
  }

  /**
   * Logs the user out
   */
  public static logout_user(): void {
    this.activeUser = null;
    SystemComponent.SysComponent = LoginscreenComponent;
  }

  /**
   * Log out the user and terminate their running processes
   */
  public static logout_user_and_kill_user_process(): void {
    const acUser = this.activeUser;
    if (acUser) {
      this.get_user_process(acUser.username).forEach((value: Process) => {
        value.kill();
      });
      acUser.running = false;
      this.logout_user();
    }
  }
}
