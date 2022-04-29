import {BlackscreenComponent} from 'src/app/Bios/components/blackscreen/blackscreen.component';
import {GrubComponent} from 'src/app/Grub/grub/grub.component';
import {SystemComponent} from 'src/app/Grub/system/system.component';
import {
  AppCreatMetadata,
  onShutDown,
  onStartUp,
  Os, SystemFileStateData,
  SystemStateMetadata,
  SystemStringStateCorrection,
  SystemUserStateData,
} from './interface/system';
import {Process} from './SystemComponents/Process';
import {System} from './SystemComponents/System';
import {LoadsComponent} from './components/loads/loads.component';
import {NapicuOSComponent} from './components/napicu-os/napicu-os.component';
import {BOOT_TIME, SOFT_BOOT_TIME} from './config/boot';
import {TIME_FORMAT, TIME_FORMAT_CALENDAR} from './config/time';
import {Line} from './Apps/console/console.component';
import {Command, CommandFunMetadata} from './SystemComponents/Command';
import {initAllCommands} from './initCommands.napicuos';
import {initAllStartUpApps, initAllSystemProcess, installAllApps,} from './systemApps.napicuos';
import {SystemFile} from './SystemComponents/File';
import {systemDirAFileMetadata, systemDirMetadata, systemDrivesMetadata,} from './interface/FilesDirs/systemDir';
import {
  SYSTEM_BOOT_SCREEN_LOGO,
  SYSTEM_BOOT_SCREEN_TITLE,
  SYSTEM_DEFAULT_HOSTNAME,
  SYSTEM_HOSTNAME_MAX_LENGTH,
  SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_USERS_MAX_LENGTH,
  SYSTEM_USERS_MIN_LENGTH
} from './config/system';
import {napicu_os_root_part, NapicuOSSystemDir} from './config/drive';
import {User} from './SystemComponents/User';
import {CommandStateCodeMetadata} from './interface/Commands/commandsCodes';
import {LoginscreenComponent} from './components/loginscreen/loginscreen.component';
import {SystemUserPermissionsEnumMetadata} from './interface/User/user';
import {SystemFileTypeEnumMetadata} from './interface/FilesDirs/file';
import {SystemAlert} from './SystemComponents/Alert';
import {systemAlertTypeEnumMetadata} from "./interface/Alert/alert";
import {SystemCommandsPrefixEnum} from "./interface/Commands/commands";
import {SystemDockDisplay} from "./interface/System/dock";
import {SystemNotification} from "./SystemComponents/Notification";
import {NOTIFICATION_ACTIVE_TIME} from "./config/notificationAnimations";
import {getCookies, setCookies} from "../../../Bios/Scripts/Cookies";
import {NAPICUOS_COOKIES_NAME} from "./config/cookies";
import {NapicuOsCookiesTemplate} from "./interface/cookies";
import {NapicuCookies} from "./scripts/decorators";
import {UserConstructorMetadata} from "./interface/user";
import {NapicuCalendar} from "./scripts/Calendar";
import {NapicuOS_available_language, NapicuOSLanguages} from "./Language/langs";
import {NapicuDate} from "napicuformatter";
import {NapicuAudio} from "./SystemComponents/Audio";
import {Window} from "./SystemComponents/Window";
import {SystemRemindNotificationConstructorMetadata} from "./interface/remidNotification";
import {SystemRemindNotification} from "./SystemComponents/RemindNotification";
import {checkIsRemindNotificationExpired} from "./scripts/RemindNotificationS";
import {checkSystemStringLength} from './scripts/ChckStringCorrection';
import {TerminalClass} from "./SystemComponents/Terminal";

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public static systemTime: string;
  public static systemData = {
    installed: true,
  };
  private static drives: systemDrivesMetadata = NapicuOSSystemDir;
  public static activeUsers: string[] = [];
  @NapicuCookies()
  public static SystemCookiesConfig: NapicuOsCookiesTemplate = {
    user: {
      activeUser: null,
      users: []
    },
    hostname: SYSTEM_DEFAULT_HOSTNAME
  };
  public override boot = {
    title: SYSTEM_BOOT_SCREEN_TITLE,
    logo: SYSTEM_BOOT_SCREEN_LOGO,
  };
  //Default system language
  //TODO: Config language
  public static language: NapicuOS_available_language = 'en';

  public override onStart(): void {
    //TODO Login & root creat
    this.SystemBoot();
  }

  public override onShutDown(): void {
  }

  public SystemBoot(): void {
    //? This is  the main place to load all necessary processes

    //Init System Dependencies
    //Initialization of all system processes
    initAllSystemProcess();
    //Initialize all system commands
    initAllCommands();
    //Initialize all system applications
    installAllApps();

    //Init System Config & Users
    NapicuOS.initSystemConfigCookies();
    //Initialization of all users
    this.initUsers();


    SystemComponent.SystemComponent = LoadsComponent;
    setTimeout(() => {
      SystemComponent.SystemComponent = BlackscreenComponent;
      this.load();

      if (NapicuOS.get_active_user()) {
        setTimeout(() => {
          SystemComponent.SystemComponent = NapicuOSComponent;
          // setTimeout(() => {

          // }, boot_animation_time + 100);
        }, SOFT_BOOT_TIME);
      } else {
        SystemComponent.SystemComponent = LoginscreenComponent;
      }
    }, BOOT_TIME);
  }

  public override onLogin(): void {
    if (!NapicuOS.get_if_user_active(NapicuOS.get_active_user()?.username)) {
      initAllStartUpApps();

    }
  }

  protected static initSystemConfigCookies(): void {
    const i = getCookies<NapicuOsCookiesTemplate>(NAPICUOS_COOKIES_NAME);
    if (i) this.SystemCookiesConfig = i;
  }

  public initUsers(): void {
    let i: NapicuOsCookiesTemplate | null = NapicuOS.get_system_config_from_cookies();
    let initUser: UserConstructorMetadata;


    //Init Root user
    const system_root_user = new User({
      username: 'root',
      password: 'root',
      permissions: SystemUserPermissionsEnumMetadata.SuperUser
    });

    //Init default basic user
    const system_default_user = new User({
      username: 'user',
      password: 'napicuos',
      permissions: SystemUserPermissionsEnumMetadata.User
    });

    if (!i?.user.users.length) {
      //Initialization of all users
      [system_default_user, system_root_user].forEach((user: User) => {
        NapicuOS.add_user(user);
      });
    }
    initUser = NapicuOS.get_user_by_username(i?.user.activeUser) || system_default_user;


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
    return new NapicuDate().format(TIME_FORMAT); //TODO Settings
  }

  public static getTimeByFormat(format: string): string {
    return new NapicuDate().format(format); //TODO Settings
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
    return GrubComponent.GrubActiveSystem.SystemBooted;
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
   * Returns if the system activities menu is displayed
   */
  public static get_system_activities_display(): boolean {
    return NapicuOSComponent.ActivityDisplay;
  }

  /**
   * Function for disable application window management
   */
  public static disable_window_manager(): void {
    Window.windowOperation = false;
  }

  /**
   * Function for enable application window management
   */
  public static enable_window_manager(): void {
    Window.windowOperation = true;
  }

  /**
   * Function for return if the window manager is enabled or disabled
   */
  public static get_window_manager_status(): boolean {
    return Window.windowOperation;
  }

  /**
   * Returns the system processes
   */
  public static get_system_process(): Process[] {
    return GrubComponent.GrubActiveSystem.SystemProcess;
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

  public static get_dir_by_path(dir: string): { data: systemDirAFileMetadata | null, state: SystemStateMetadata } { //TODO return SystemPathStateData
    let dirs = dir.split("/");
    dirs.shift();
    let currentDir: systemDirAFileMetadata | undefined = (!dirs[0].length) ? this.get_root_dir() : this.get_root_dir()?.dir?.[dirs[0]];
    if (currentDir) {
      for (let i = 1; i < dirs.length; i++) {
        let nextPath: systemDirAFileMetadata | undefined = currentDir?.dir?.[dirs[i]]
        if (!nextPath) {
          return {data: null, state: SystemStateMetadata.PathNotExist}
        }
        currentDir = nextPath;
      }
      return {data: currentDir || null, state: SystemStateMetadata.PathExist};
    } else {
      return {data: null, state: SystemStateMetadata.PathNotExist}
    }
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
   * Returns apps in activity system menu
   */
  public static get_activity_apps_menu(): SystemFile[] {
    return NapicuOSComponent.ActivityMenuApps;
  }

  /**
   * Adds app to activity system menu
   * @param app
   */
  public static add_app_to_activity_menu(app: SystemFile) {
    NapicuOSComponent.ActivityMenuApps.push(app);
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
   * Returns the user's audio volume
   */
  public static get_user_settings_audio_volume(): number {
    return this.get_active_user()?.userSetting.audioVolume || 1;
  }

  /**
   * Plays the audio file
   * @param src Audio file
   */
  public static play_audio(src: string) {
    new NapicuAudio(src, this.get_user_settings_audio_volume()).play();
  }

  /**
   * Plays the notification sound
   */
  public static audio_play_notification(): void {
    this.play_audio("LongPop.mp3");
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
    const userAppsInDock = this.get_active_user()?.userSetting.appsInDock || [];
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
   * Return user remind notifications
   */
  public static get_user_remind_notifications(): SystemRemindNotification[] {
    return this.get_active_user()?.userSetting.notifications.remindNotificationList || [];
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
  public static get_user_by_username(username: string | null | undefined): User | undefined {
    return this.get_users().filter((value: User) => {
      return value.username === username;
    })[0];
  }

  /**
   * Returns the logged-in user.
   */
  public static get_active_user(): User | undefined {
    return this.get_user_by_username(this.SystemCookiesConfig.user.activeUser);
  }

  /**
   * Sets the active user
   * @param user The user you want to put as active
   */
  public static set_active_user(user: User): void {
    this.SystemCookiesConfig.user.activeUser = user.username;
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
      setCookies<NapicuOsCookiesTemplate>(NAPICUOS_COOKIES_NAME, this.SystemCookiesConfig);
    }
  }

  /**
   * Returns the computer's name
   */
  public static get_hostname(): string {
    return this.SystemCookiesConfig.hostname;
  }

  /**
   * Sets a new computer name
   * @param hostname New computer name
   */
  public static set_hostname(hostname: string): SystemStringStateCorrection {
    let lng: SystemStringStateCorrection = checkSystemStringLength(hostname, SYSTEM_HOSTNAME_MIN_LENGTH, SYSTEM_HOSTNAME_MAX_LENGTH);
    if (lng === SystemStateMetadata.StringCorrect) {
      this.SystemCookiesConfig.hostname = hostname;
      this.update_config_to_cookies();
    }
    return lng;
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
    params?: string[],
    terminal?: TerminalClass
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
      return await i.open({params: params, terminal: terminal});
    } else {
      return {
        linesForCMD: [new Line(`${cmd}: command not found`, 'red')],
        stateCode: CommandStateCodeMetadata.CommandNotFound,
      };
    }
  }

  /**
   * Function to update the system calendar
   */
  public static update_calendar(): void {
    NapicuOSComponent.CalendarMenu.calendar = new NapicuCalendar(new NapicuDate().getCurrentYear(), NapicuOSComponent.CalendarMenu.selectedMonth).data;
    NapicuOSComponent.CalendarMenu.calendarDays = NapicuDate.getLanguageShortsDays();
    NapicuOSComponent.CalendarMenu.fullDate = new NapicuDate().format(TIME_FORMAT_CALENDAR);
  }

  /**
   * Function to update the system time
   */
  public static update_time(): void {
    this.systemTime = this.getTime();
  }

  /*
   * Function to check users' reminder notifications
   */
  public static check_user_remind_notifications(): void { //TODO
    this.get_user_remind_notifications().forEach((i: SystemRemindNotification) => {
      if (checkIsRemindNotificationExpired(i)) {
        this.remind_notification_push(i)
      }
    });
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
  ): SystemFileStateData {
    if (dir?.files) {
      if (
        dir.files.filter((value: SystemFile) => {
          return value.fileName === file.fileName;
        })?.length
      ) {
        return SystemStateMetadata.FileAlreadyExists;
      } else if (/\s/.test(file.fileName)) {
        return SystemStateMetadata.FileHasBadName;
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
   * Returns the system language
   */
  public static get_language(): string {
    return this.language;
  }

  /**
   * Returns the system language variables
   */
  public static get_language_words(): typeof NapicuOSLanguages[keyof typeof NapicuOSLanguages] {
    return NapicuOSLanguages[this.language];
  }

  /**
   * Sets the system language
   */
  public static set_language(language: NapicuOS_available_language): void {
    this.language = language;
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
  public static add_user(user: User): SystemUserStateData {
    let lng = checkSystemStringLength(user.username, SYSTEM_USERS_MIN_LENGTH, SYSTEM_USERS_MAX_LENGTH);
    if (lng === SystemStateMetadata.StringCorrect) {
      if (this.get_users().filter((systemUsers: User) => {
        return systemUsers.username === user.username
      }).length) {
        return SystemStateMetadata.UserExists;
      } else {
        const i: systemDirAFileMetadata | undefined = this.get_root_dir().dir?.["home"];
        const config = this.get_system_config_from_cookies();
        if (config) config.user.users.push(user);
        if (i) {
          this.creat_dir(i, user.username);
          const userDir = this.get_user_dir(user.username);

          //TODO init user files and dirs
        }
        if (this.SystemCookiesConfig) {
          this.SystemCookiesConfig.user.users = this.get_users().map((i: User) => {
            return i;
          });
        }


        this.update_config_to_cookies();
        return SystemStateMetadata.UserNotExists;
      }
    }
    return lng;
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
    let u: User | undefined = this.get_user_by_username(username);
    let activeUser: User | undefined = this.get_active_user();
    if (u && u.password === password) {
      activeUser = u;
    } else {
      return SystemStateMetadata.UserFailLogin;
    }
    if (this.SystemCookiesConfig) this.set_active_user(u);
    GrubComponent.GrubActiveSystem.onLogin();
    if (activeUser) this.activeUsers.push(u.username);
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
  public static install_app(data: AppCreatMetadata): void {
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
          multiRun: data.multiRun,
        }
      },
      iconPath: data.fileIconPath,
    });


    if (this.add_file_to_dir(this.get_apps_dir(), Application) === SystemStateMetadata.FileAlreadyExists) {
      console.error("CreatAppFile Error - File already exists");
    }
    if (data.addToDock) User.defaultUserSettings.appsInDock.push(Application.fileName);
    this.add_app_to_activity_menu(Application);
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
    SystemComponent.SystemComponent = LoginscreenComponent;
  }

  /**
   * Returns active users in the system
   */
  public static get_active_users(): string[] {
    return this.activeUsers;
  }

  /**
   * Returns if the user is active
   */
  public static get_if_user_active(username: string | undefined): boolean {
    if (!username) return false;
    return !this.activeUsers.indexOf(username);
  }

  /**
   * Log out the user and terminate their running processes
   */
  public static logout_user_and_kill_user_process(): void {
    let user: User | undefined = this.get_active_user();
    if (user) {
      this.get_user_process().forEach((value: Process) => {
        value.kill();
      });
      this.activeUsers.splice(this.activeUsers.indexOf(user.username), 1);
      this.logout_user();
    }
  }

  /**
   * Sends a notification
   * @param notification
   */
  protected static notification_push(notification: SystemNotification): void {
    //TODO TEST
    const user = this.get_active_user();
    if (user?.userSetting.notifications.allow) {
      user?.userSetting.notifications.notificationsList.push(notification);
      this.update_config_to_cookies();

      if (user.userSetting.notifications.receive) {
        NapicuOSComponent.NotificationActive = notification;
        this.audio_play_notification();
        setTimeout(() => {
          NapicuOSComponent.NotificationActive = null;
          setTimeout(() => {
            this.check_notification_queue()

          }, 2000);
        }, NOTIFICATION_ACTIVE_TIME);
      }
    }
  }

  /**
   * Add notification to the queue
   * @param notification
   */
  public static add_notification_to_queue_and_push(notification: SystemNotification): void {
    NapicuOSComponent.NotificationsFront.push(notification);
    this.check_notification_queue();
  }

  /**
   * Check & push a notification from the queue
   */
  protected static check_notification_queue(): void {
    if (NapicuOSComponent.NotificationsFront.length && !NapicuOSComponent.NotificationActive) {
      this.notification_push(NapicuOSComponent.NotificationsFront[0]);
      NapicuOSComponent.NotificationsFront.shift();
    }
  }

  /**
   * Adds a reminder notification to the user
   * @param remindNotificationData
   */
  public static add_remind_notification(remindNotificationData: SystemRemindNotificationConstructorMetadata) {
    this.get_active_user()?.userSetting.notifications.remindNotificationList.push(remindNotificationData);
  }

  /**
   * Sends a reminder notification
   * @param remindNotification
   */
  public static remind_notification_push(remindNotification: SystemRemindNotificationConstructorMetadata) {
    this.notification_push(new SystemNotification({
      title: remindNotification.title,
      msg: remindNotification.value,
    }));
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
