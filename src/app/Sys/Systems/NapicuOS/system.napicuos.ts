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
import {time_format} from './config/time';
import {Line} from './Apps/console/console.component';
import {Command, CommandFunMetadata} from '../../command';
import {initAllCommands} from './initCommands.napicuos';
import {initAllStartUpApps, initAllSystemProcess, installAllApps,} from './systemApps.napicuos';
import {SystemFile} from '../../File';
import {systemDirAFileMetadata, systemDrivesMetadata,} from './interface/FilesDirs/systemDir';
import {system_boot_screen_logo, system_boot_screen_title} from './config/systemInfo';
import {napicu_os_root_part, NapicuOSSystemDir} from './config/drive';
import {User} from '../../User';
import {CommandStateCodeMetadata} from './interface/Commands/commandsCodes';
import {LoginscreenComponent} from './components/loginscreen/loginscreen.component';
import {SystemUserPermissionsEnumMetadata} from './interface/User/user';
import {SystemFileTypeEnumMetadata} from './interface/FilesDirs/file';
import {SystemAlert} from '../../Alert';
import {systemAlertTypeEnumMetadata} from "./interface/Alert/alert";
import {SystemCommandsPrefixEnum} from "./interface/Commands/commands";
import {SystemDockDisplay} from "./interface/System/dock";
import {SystemNotification} from "../../Notification";
import {notification_active_time} from "./config/notificationAnimations";
import {getCookies, setCookies} from "../../../Scripts/Cookies";
import {NapicuOSCookiesName} from "./config/cookies";
import {NapicuOsCookiesTemplate} from "./interface/cookies";
import {NapicuCookies} from "./scripts/decorators";
import {UserConstructorMetadata} from "./interface/user";
import {loadUser} from "./scripts/loadUser";


export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public static systemTime: string;
  public static systemData = {
    installed: true,
  };
  private static drives: systemDrivesMetadata = NapicuOSSystemDir;
  @NapicuCookies()
  public static SystemCookiesConfig: NapicuOsCookiesTemplate = {
    user: {
      activeUser: null,
      users: []
    },
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

    NapicuOS.initSystemConfigCookies();
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
      if (NapicuOS.get_active_user()) {
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
    if (!NapicuOS.get_active_user()?.running) {
      initAllStartUpApps();
    }
  }

  protected static initSystemConfigCookies(): void {
    const i = getCookies<NapicuOsCookiesTemplate>(NapicuOSCookiesName);
    if (i) this.SystemCookiesConfig = i;
  }

  public initUsers(): void {
    let i: NapicuOsCookiesTemplate | null = NapicuOS.get_system_config_from_cookies();
    let users: UserConstructorMetadata[];
    let initUser: UserConstructorMetadata;


    //Init Root user
    const system_root_user = new User({
      username: 'root',
      password: 'root',
      userPermissions: SystemUserPermissionsEnumMetadata.SuperUser
    });

    //Init default basic user
    const system_default_user = new User({
      username: 'user',
      password: 'napicuos',
      userPermissions: SystemUserPermissionsEnumMetadata.User
    });

    users = (i?.user.users && i.user.users.length) ? i.user.users : [system_default_user, system_root_user];
    initUser = i?.user.activeUser || system_default_user;
    //Initialization of all users
    users.forEach((user: UserConstructorMetadata) => {
      NapicuOS.add_user(new User(user));
    });


    // NapicuOS.add_user(system_default_user);
    // NapicuOS.add_user(system_root_user);

    //Automatic login of the default user
    NapicuOS.log_user(
      initUser.username,
      initUser.password
    );
  }

  public override onLoad(): void {
  }

  /**
   * A function that runs when a new process is started.
   */
  public static onRunNewProcess(): void {
    this.update_dock_items();
  }

  /**
   * A function that starts when a new application is launched.
   */
  public static onRunNewApp(): void {
    this.update_dock_items();
  }

  /**
   * Function that starts after kill the process
   */
  public static onKillProcess(): void {
    this.update_dock_items();
  }

  public static getTime(): string {
    let now = new Date();
    return formatDate(now, time_format, 'en-US'); //TODO Settings
  }

  public static getTimeByFormat(format: string): string {
    let now = new Date();
    return formatDate(now, format, 'en-US'); //TODO Settings
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
   * Returns if the system context date is displayed
   */
  public static get_system_top_date_display(): boolean {
    return NapicuOSComponent.DataDisplay;
  }

  /**
   * Returns the system processes
   */
  public static get_system_process(): Process[] {
    return GrubComponent.ActiveSystem.SystemProcess;
  }

  /**
   * Returns the user processes
   */
  public static get_user_process(): Process[] {
    return this.get_system_process().filter((value: Process) => {
      return value.launchedBy === (this.get_active_user()?.username || "");
    });
  }

  /**
   * Returns process by process title
   * @param processTitle Name of the process you want to search for
   */
  public static get_system_process_by_title(processTitle: string): Process {
    return this.get_system_process().filter((element: Process) => {
      return element.processTitle === processTitle;
    })[0];
  }

  /**
   * Returns applications
   */
  public static get_system_window_apps(): Process[] {
    return this.get_windowProcess_by_processes(this.get_system_process());
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
   * Returns the application process by application process name
   */
  public static get_apps_running_by_process_title(processTitle: string): Process[] {
    return this.get_system_process().filter((element: Process) => {
      return element.processTitle === processTitle && element.Window;
    });
  }

  /**
   * Returns displayed windows by process title
   * @param processTitle Process title of the application window
   */
  public static get_system_displayed_window_apps_by_process_title(processTitle: string): Process[] {
    return this.get_system_displayed_window_apps().filter((element: Process) => {
      return element.processTitle === processTitle;
    })
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
    let i: SystemFile[];
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
    let i: SystemFile[];
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
   * Returns main users directory
   */
  public static get_usrs_dir(): systemDirAFileMetadata | undefined {
    return this.get_root_dir().dir?.["home"];
  }

  /**
   * Returns the user's folder by username
   * @param username User name
   */
  public static get_user_dir(username: string): systemDirAFileMetadata | undefined {
    const dir = this.get_usrs_dir()?.dir;
    if (dir) {
      return dir[username];
    }
    return undefined;
  }

  /**
   * Creates a new directory in the directory
   * @param dir The name of the directory in which you want to create the directory
   * @param dirname Name of the new directory
   */
  public static creat_dir(dir: systemDirAFileMetadata, dirname: string):
    SystemStateMetadata.DirExist |
    SystemStateMetadata.DirNotExist {
    const i: systemDirAFileMetadata | undefined = dir.dir?.[dirname];
    if (!i) {
      dir.dir ? dir.dir[dirname] = {
        dir: {}, files: []
      } : undefined;
      return SystemStateMetadata.DirNotExist;
    }
    return SystemStateMetadata.DirExist;
  }

  /**
   * Returns files in the active user's dock
   */
  public static get_user_apps_in_dock(): SystemFile[] {
    //TODO BottomDockProcess in NapicuOSComponent
    const userAppsInDock = this.get_active_user()?.userSetting.appsInDock || []
    if (userAppsInDock.length) {
      const i: SystemFile[] = [];
      userAppsInDock.forEach((appName: string) => {
        i.push(<SystemFile>this.get_app_file_by_file_name(appName));
      });
      return i;
    }
    return [];
  }

  /**
   * Returns user notifications
   */
  public static get_user_notifications(): SystemNotification[] {
    return this.get_active_user()?.userSetting.notifications.notificationsList || [];
  }

  /**
   * Returns the displayed user windows
   */
  public static get_user_system_displayed_window_apps(): Process[] {
    return this.get_user_process().filter((element: Process) => {
      return element.Window?.display == true;
    });
  }

  /**
   * Returns the user's displayed windows by process name
   * @param processTitle Process title of the application window
   */
  public static get_user_system_displayed_window_apps_by_process_title(processTitle: string): Process[] {
    return this.get_user_system_displayed_window_apps().filter((element: Process) => {
      return element.processTitle === processTitle;
    })
  }

  /**
   * Returns the user's application windows
   */
  public static get_user_system_window_apps(): Process[] {
    return this.get_windowProcess_by_processes(this.get_user_process());
  }

  /**
   * Returns user process by process title
   * @param processTitle Name of the process you want to search for
   */
  public static get_user_process_by_title(processTitle: string): Process {
    return this.get_user_process().filter((element: Process) => {
      return element.processTitle === processTitle;
    })[0];
  }

  /**
   * Returns files in the dock
   */
  public static get_system_apps_in_dock(): SystemDockDisplay[] {
    return NapicuOSComponent.BottomDockProcess;
  }

  /**
   * Updates the system dock
   */
  public static update_dock_items(): void {
    let i: SystemFile[] = [];
    this.get_user_system_window_apps().forEach((App: Process) => {
      let file = this.get_file_by_file_title(this.get_apps_dir(), App.processTitle);
      if (typeof file === "object" && this.get_user_apps_in_dock().filter((file: SystemFile) => {
        return file.fileName === App.processTitle;
      }).length === 0 && i.map(value => value.fileName).indexOf(App.processTitle) !== 0) i.push(file);
    });

    let appsInDock: SystemDockDisplay[] = this.get_user_apps_in_dock().map((value: SystemFile) => {
      return {
        file: value,
        alreadyPinned: true,
        running: !!this.get_user_system_displayed_window_apps_by_process_title(value.fileName).length,
        selected: (this.get_system_activated_window_app()?.processTitle === value.fileName)
      };
    });


    let activeApps: SystemDockDisplay[] = i.map((file: SystemFile) => {
      return {
        file: file,
        alreadyPinned: false,
        running: true,
        selected: (this.get_system_activated_window_app()?.processTitle === file.fileName)
      }
    });


    NapicuOSComponent.BottomDockProcess = [...new Set([...appsInDock, ...activeApps])];
  }

  /**
   * Returns the application in the dock by filename
   * @param fileName File name
   */
  public static get_apps_in_dock_by_file_name(fileName: string): SystemFile[] {
    return this.get_user_apps_in_dock().filter((value: SystemFile) => {
      return value.fileName === fileName
    });
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
    return this.SystemCookiesConfig.user.users.map((user: UserConstructorMetadata) => {
      return new User(user);
    });
  }

  /**
   * Returns the user by username if the user exists
   * @param username Username of searched user
   */
  public static get_user(username: string): User | undefined {
    return this.get_users().filter((value: User) => {
      return value.username === username;
    })[0];
  }

  /**
   * Returns the logged-in user.
   */
  public static get_active_user(): User | null {
    let i = this.SystemCookiesConfig.user.activeUser;
    if (i) return new User(i);
    return null;
  }

  /**
   * Sets the active user
   * @param user The user you want to put as active
   */
  public static set_active_user(user: User): void {
    this.SystemCookiesConfig.user.activeUser = user;
    this.update_config_to_cookies();
  }

  /**
   * Returns system settings from cookies
   */
  public static get_system_config_from_cookies(): NapicuOsCookiesTemplate | null {
    return this.SystemCookiesConfig;
  }

  /**
   * Updates the system configuration in cookies
   */
  public static update_config_to_cookies(): void {
    if (this.SystemCookiesConfig) {
      setCookies<NapicuOsCookiesTemplate>(NapicuOSCookiesName, this.SystemCookiesConfig);
    }
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
    if (i) {
      if (
        i.permissions.read ===
        SystemUserPermissionsEnumMetadata.SuperUser &&
        this.get_active_user()?.permissions !==
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
    this.get_active_user()?.userSetting.appsInDock.push(file.fileName);
    this.update_dock_items();
  }

  /**
   * Deletes a file from the dock by index
   * @param index File index in the dock
   */
  public static remove_file_from_dock_by_index(index: number): void {
    const user = this.get_active_user();
    if (user) {
      user.userSetting.appsInDock.splice(index, 1);
      this.update_dock_items();
    }
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
  public static add_user(user: User): SystemStateMetadata.UserExists | SystemStateMetadata.UserNotExists {
    if (this.get_users().filter((systemUsers: User) => {
      return systemUsers.username === user.username
    }).length) {
      return SystemStateMetadata.UserExists;
    } else {
      const i: systemDirAFileMetadata | undefined = this.get_root_dir().dir?.["home"];
      const config = this.get_system_config_from_cookies();
      if (config) config.user.users.push(loadUser(user));

      if (i) {
        this.creat_dir(i, user.username);
        const userDir = this.get_user_dir(user.username);
        if (userDir) {
          userDir.dir = {
            Desktop: {},
            Documents: {},
            Downloads: {},
            Music: {},
            Pictures: {},
            Videos: {},
          }
        }
      }
      if (this.SystemCookiesConfig) {
        this.SystemCookiesConfig.user.users = this.get_users().map((i: User) => {
          return loadUser(i)
        });
      }
      this.update_config_to_cookies();
      return SystemStateMetadata.UserNotExists;
    }
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
    let activeUser = this.get_active_user();
    if (u && u.password === password) {
      activeUser = u;
    } else {
      return SystemStateMetadata.UserFailLogin;
    }
    if (this.SystemCookiesConfig) this.set_active_user(u);
    GrubComponent.ActiveSystem.onLogin();
    if (activeUser) activeUser.running = true;
    this.update_dock_items();
    return SystemStateMetadata.UserLoginSuccess;
  }

  /**
   * Clears user notifications
   * @param user User
   */
  public static clear_user_notification(user: User): void {
    user.userSetting.notifications.notificationsList = [];
    this.update_config_to_cookies();
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
          windowButtons: data.windowButtons,
          multiRun: data.multiRun
        }
      },
      iconPath: data.fileIconPath,
    });

    if (this.add_file_to_dir(this.get_apps_dir(), Application) === SystemStateMetadata.FileAlreadyExists) {
      console.error("CreatAppFile Error - File already exists");
    }
    if (data.addToDock) User.defaultUserSettings.appsInDock.push(Application.fileName);
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
    this.SystemCookiesConfig.user.activeUser = null;
    SystemComponent.SysComponent = LoginscreenComponent;
  }

  /**
   * Log out the user and terminate their running processes
   */
  public static logout_user_and_kill_user_process(): void {
    const acUser = this.get_active_user();
    if (acUser) {
      this.get_user_process().forEach((value: Process) => {
        value.kill();
      });
      acUser.running = false;
      this.logout_user();
    }
  }

  /**
   * Sends a notification
   * @param notification
   */
  public static notification_push(notification: SystemNotification): void {
    //TODO TEST
    const user = this.get_active_user();
    if (user?.userSetting.notifications.allow) {
      user?.userSetting.notifications.notificationsList.push(notification);
      this.update_config_to_cookies();
      if (user.userSetting.notifications.receive) {
        NapicuOSComponent.NotificationActive = notification;
        setTimeout(() => {
          NapicuOSComponent.NotificationActive = null;
        }, notification_active_time);
      }
    }
  }

  /**
   * Returns the system application by filename
   * @param filename File name
   */
  public static get_app_file_by_file_name(filename: string): SystemFile | null {
    const file = this.get_file_by_file_title(this.get_apps_dir(), filename);
    if (typeof file === "object") {
      return file;
    }
    return null;
  }

  /**
   * @param processes Processes for filtration
   */
  private static get_windowProcess_by_processes(processes: Process[]): Process[] {
    let array: Process[] = [];
    processes.forEach((value: Process) => {
      if (value?.Window) {
        array.push(value);
      }
    });
    return array;
  }

}

