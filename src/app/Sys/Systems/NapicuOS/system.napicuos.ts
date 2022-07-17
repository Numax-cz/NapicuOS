import {BlackscreenComponent} from 'src/app/Bios/components/blackscreen/blackscreen.component';
import {GrubComponent} from 'src/app/Grub/grub/grub.component';
import {SystemComponent} from 'src/app/Grub/system/system.component';
import {
  AppCreatMetadata,
  onShutDown,
  onStartUp,
  Os,
  SystemDirStateData,
  SystemDocumentData,
  SystemFileStateData,
  SystemStateMetadata,
  SystemStringStateCorrection,
  SystemUserStateData,
} from './interface/System';
import {Process} from './SystemComponents/Process';
import {System} from './SystemComponents/System';
import {LoadsComponent} from './components/loads/loads.component';
import {NapicuOSComponent} from './components/napicu-os/napicu-os.component';
import {BOOT_TIME, SOFT_BOOT_TIME} from './config/Boot';
import {TIME_FORMAT, TIME_FORMAT_CALENDAR} from './config/Time';
import {Line} from './Apps/console/console.component';
import {Command, CommandFunMetadata} from './SystemComponents/Command';
import {initAllCommands} from './initCommands.napicuos';
import {initAllStartUpApps, initAllSystemProcess, installAllApps,} from './systemApps.napicuos';
import {SystemFile} from './SystemComponents/File';
import {systemDirAFileMetadata, systemDirMetadata, systemDrivesMetadata,} from './interface/FilesDirs/SystemDir';
import {
  SYSTEM_BOOT_SCREEN_LOGO,
  SYSTEM_BOOT_SCREEN_TITLE,
  SYSTEM_DEFAULT_HOME_FOLDERS,
  SYSTEM_DEFAULT_HOSTNAME,
  SYSTEM_FILE_NAME_REGEX,
  SYSTEM_HOSTNAME_MAX_LENGTH,
  SYSTEM_HOSTNAME_MIN_LENGTH,
  SYSTEM_IMAGES,
  SYSTEM_INFORMATION,
  SYSTEM_SOUNDS,
  SYSTEM_USERS_MAX_LENGTH,
  SYSTEM_USERS_MIN_LENGTH
} from './config/System';
import {NAPICU_OS_ROOT_PART, NapicuOSSystemDir} from './config/Drive';
import {User} from './SystemComponents/User';
import {CommandStateCodeMetadata} from './interface/Commands/CommandsCodes';
import {LoginscreenComponent} from './components/loginscreen/loginscreen.component';
import {
  SystemFileConsMetadata,
  SystemFileTypeEnumMetadata,
  SystemUpdateFileConsMetadata
} from './interface/FilesDirs/File';
import {SystemAlert} from './SystemComponents/Alert';
import {systemAlertImagesEnumMetadata} from "./config/Alert";
import {SystemCommandsPrefixEnum} from "./config/commands/Commands";
import {SystemDockDisplay} from "./interface/System/dock";
import {SystemNotification} from "./SystemComponents/Notification";
import {NOTIFICATION_ACTIVE_TIME} from "./config/NotificationAnimations";
import {getCookies, setCookies} from "../../../Bios/Scripts/Cookies";
import {NAPICUOS_COOKIES_NAME} from "./config/Cookies";
import {NapicuOsCookiesTemplate} from "./interface/Cookies";
import {NapicuCookies} from "./scripts/Decorators";
import {NapicuCalendar} from "./scripts/Calendar";
import {NapicuOS_available_language, NapicuOSLanguages} from "./Language/langs";
import {NapicuDate} from "napicuformatter";
import {NapicuAudio} from "./SystemComponents/Audio";
import {Window} from "./SystemComponents/Window";
import {SystemRemindNotificationConstructorMetadata} from "./interface/RemidNotification";
import {SystemRemindNotification} from "./SystemComponents/RemindNotification";
import {checkIsRemindNotificationExpired} from "./scripts/RemindNotificationS";
import {checkSystemStringLength} from './scripts/ChckStringCorrection';
import {SystemUserPermissionsEnumMetadata} from "./config/UserPerms";
import {UserConstructorMetadata} from "./interface/User/User";
import {imagePreloader} from "./scripts/ImagePreloader";
import {audioPreloader} from "./scripts/AudioPreloader";
import {ReturnGetDirByPathMetadata} from "./interface/GetDirByPath";
import {SystemInputAlert} from "./SystemComponents/AlertInput";
import {NapicuOsCookiesFileMetadata} from "./interface/CookiesFiles";
import {PathSpliceLastIndex} from "./scripts/PathSplice";
import {PathSpliceMetadata} from "./interface/PathSplice";
import {FormatPathToObject} from "./scripts/FormatPath";
import {IfDirFileMetadata} from "./interface/IfDirFile";
import {ReplaceSystemVariables} from "./scripts/ReplaceVariables";
import {IsPathMatch} from "./scripts/PathMatch";
import {PathHasLastSlash, PathHasntLastSlash} from "./scripts/PathChecker";
import {CommandParams} from "./interface/Commands/CommandParams";
import {processConstructor} from "./interface/Process";
import {InputButtonTypeMetadata} from "./interface/InputButtonType";

export class NapicuOS extends System implements Os, onStartUp, onShutDown {
  public static systemTime: string = "NULL";
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
    hostname: SYSTEM_DEFAULT_HOSTNAME,
    directorys: [],
    files: []
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
    //TODO Loading screen
    //TODO Kill all process
    //TODO Save all cookies
    //TODO => loading
  }

  public async SystemBoot(): Promise<void> {
    //? This is  the main place to load all necessary processes

    //Set black screen
    SystemComponent.SystemComponent = BlackscreenComponent;
    //Preload based images
    //await imagePreloader(SYSTEM_BOOT_SCREEN_LOGO); //TODO
    //await imagePreloader(SYSTEM_WALLPAPER); //TODO

    //Set system loading screen
    SystemComponent.SystemComponent = LoadsComponent;
    //Init System components
    await this.loadSystemComponents();
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

  /**
   * Loads all system components
   */
  public loadSystemComponents(): Promise<void> {
    return new Promise<void>(async resolve => {
      //Initialization of all system processes
      initAllSystemProcess();
      //Initialize all system commands
      initAllCommands();
      //Initialize all system applications
      installAllApps();
      //Init System Config & Users
      NapicuOS.initSystemConfigCookies();
      //Initialization all dynamic directories
      this.loadDirectoriesFromConfig();
      //Initialization of all users
      this.initUsers();
      //Initialization all dynamic files
      this.loadFilesFromConfig();

      //Preload all images
      //await this.loadSystemImages(); //TODO
      //Preload system sounds
      //await this.loadSystemSounds(); //TODO


      resolve();
    });
  }

  /**
   * Preload system sounds
   */
  protected async loadSystemSounds(): Promise<void> {
    return new Promise<void>(async resolve => {
      //Preload system sounds
      for (const snd of Object.entries(SYSTEM_SOUNDS)) {
        await NapicuOS.add_sound_to_system(snd[0], snd[1])
      }
      resolve();
    });
  }

  /**
   * Preload system images
   */
  protected async loadSystemImages(): Promise<void> {
    return new Promise<void>(async resolve => {
      //Preload system images
      for (const snd of Object.entries(SYSTEM_IMAGES)) {
        await NapicuOS.add_image_to_system(snd[0], snd[1])
      }
      resolve();
    });
  }

  /**
   * Initialize all directories from config
   */
  protected loadDirectoriesFromConfig(): void {
    let pth = NapicuOS.get_system_config_from_cookies()?.directorys;
    if (pth) {
      pth.forEach((path: string) => {
        NapicuOS.creat_path(path);
      });
    }
  }

  /**
   * Initialize all files from config
   */
  protected loadFilesFromConfig(): void {
    let pth: NapicuOsCookiesFileMetadata[] | undefined = NapicuOS.get_system_config_from_cookies()?.files;
    if (pth) {
      pth.forEach((fl: NapicuOsCookiesFileMetadata) => {
        let i = NapicuOS.add_file_to_dir_by_path(fl.path, new SystemFile(fl.file));
        if(i !== SystemStateMetadata.FileAddedSuccess) {
          console.error(`SYSTEM: Path ${fl.path} not exist`);
          console.error(i);
          return;
        }
      });
    }
  }

  public override onLogin(): void {
    if (!NapicuOS.get_if_user_active(NapicuOS.get_active_user()?.username)) {
      initAllStartUpApps();
    }
  }

  /**
   * Shuts down the NapicuOS
   */
  public static shutDown(): void {
    GrubComponent.GrubActiveSystem.shutDown();
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
    else {
      //Init users home directory
      //NapicuOS.creat_user_home_dirs(new User(user));
      i.user.users.forEach((user: UserConstructorMetadata) => {
        NapicuOS.creat_user_home_dirs(user.username);
      });
    }

    initUser = NapicuOS.get_user_by_username(i?.user.activeUser) || system_default_user;


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
    return new NapicuDate().format(TIME_FORMAT);
  }

  public static getTimeByFormat(format: string): string {
    return new NapicuDate().format(format);
  }

// * * * Getters * * *
  /**
   * Returns system name
   */
  public static get_system_information_os_name(): string {
    return SYSTEM_INFORMATION.name;
  }

  /**
   * Returns system version
   */
  public static get_system_information_os_version(): string {
    return SYSTEM_INFORMATION.ver;
  }

  /**
   * Returns system type - 32bit/64bit
   */
  public static get_system_information_os_type(): string {
    return SYSTEM_INFORMATION.type;
  }

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

  /**
   * Returns directory
   */
  public static get_drives(): systemDrivesMetadata {
    return this.drives;
  }

  /**
   * Returns drives names
   */
  public static get_drives_name(): string[] {
    return Object.keys(this.drives);
  }


  /**
   * Returns the drive by specified drive letter
   * @param path
   */
  public static get_dir_by_path(path: string): ReturnGetDirByPathMetadata {
    let dirs = FormatPathToObject(path);
    let currentDir: systemDirAFileMetadata | undefined = (!dirs[0]?.length) ? this.get_root_dir() : this.get_root_dir()?.dir?.[dirs[0]];
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
    return this.get_drives()[NAPICU_OS_ROOT_PART];
  }

  /**
   * Returns main home directory
   */
  public static get_home_dir(): systemDirAFileMetadata | undefined {
    return this.get_root_dir().dir?.['home'];
  }

  /**
   * Returns system sounds directory
   */
  public static get_sounds_dir(): systemDirAFileMetadata | undefined {
    return this.get_usr_dir()?.dir?.['sounds'];
  }

  /**
   * Returns system images directory
   */
  public static get_images_dir(): systemDirAFileMetadata | undefined {
    return this.get_usr_dir()?.dir?.['images'];
  }

  /**
   * Returns main usr directory
   */
  public static get_usr_dir(): systemDirAFileMetadata | undefined {
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
   * @param volume Audio volume
   */
  public static play_audio(src: string, volume?: number): void {
    new NapicuAudio(src, volume || this.get_user_settings_audio_volume()).play();
  }

  /**
   * Plays the notification sound
   */
  public static audio_play_notification(): void {
    this.play_audio(SYSTEM_SOUNDS.LongPop);
  }

  /**
   * Creates a new directory in the directory
   * @param dir The name of the directory in which you want to create the directory
   * @param dirname Name of the new directory
   */
  public static creat_dir(dir: systemDirAFileMetadata | undefined, dirname: string):
    SystemDirStateData {
    if (!this.check_file_name(dirname)) return SystemStateMetadata.InvalidFileDirName;
    if (!dir) return SystemStateMetadata.PathNotExist;
    if (!dir.dir) dir.dir = {}
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
   * Rename the directory
   * @param path
   * @param name
   */
  public static rename_dir(path: string, name: string): SystemDirStateData | SystemStateMetadata.Success {
    let root_path: string = PathSpliceLastIndex(path).path;
    if(this.check_file_name(name)){
      const dir: ReturnGetDirByPathMetadata = this.get_dir_by_path(path);
      if(!dir?.data?.dir) return SystemStateMetadata.PathNotExist;
      this.creat_path(`${root_path}/${name}`);
      this.remove_path(`${path}`);
      let n_dir = this.get_dir_by_path(`${root_path}/${name}`).data;
      if(n_dir?.dir) {
        n_dir.dir = dir.data.dir;
        n_dir.files = dir.data.files;
        return SystemStateMetadata.Success;
      }
      console.error(`SYSTEM: ${path}/${name} not exist`);
      return SystemStateMetadata.PathNotExist;
    }
    return SystemStateMetadata.InvalidFileDirName;
  }

  /**
   * Rename the file
   * @param path
   * @param name
   */
  public static rename_file(path: string, name: string): any{
    let i: SystemStateMetadata | SystemFile = this.get_file_by_path(path);
    if(i instanceof SystemFile){
      i.fileName = name;
      return SystemStateMetadata.Success;
    }
    return i;
  }

  /**
   * Removes the file from path
   * @param path - Path to the file
   */
  public static remove_file(path: string): SystemStateMetadata | SystemFile {
    let pth: PathSpliceMetadata = PathSpliceLastIndex(PathHasntLastSlash(path));
    let directory: ReturnGetDirByPathMetadata = this.get_dir_by_path(pth.path);
    if(!directory.data) return SystemStateMetadata.PathNotExist;
    if(directory.data?.files?.length){
      let fl_files = this.get_file_by_path(path);
      if(fl_files instanceof SystemFile) {
        let file_index = directory.data.files.indexOf(fl_files);
        delete directory.data.files[file_index];
        this.remove_dynamic_file(path);
        return SystemStateMetadata.Success;
      }
    }
    return SystemStateMetadata.FileNotExist;
  }

  /**
   * Rewrite the file
   * @param path Path to file
   * @param value New value of file
   */
  public static rewrite_file(path: string, value: string): SystemFile | SystemStateMetadata{
    let i: SystemStateMetadata | SystemFile = this.get_file_by_path(path);
    if(i instanceof SystemFile){
      i.value = value;
      return i;
    }
    return i;
  }


  /**
   * Creates a new directory by path
   * @param path
   */
  public static creat_path(path: string): void {
    let i: string[] = FormatPathToObject(path);
    let pth: string = "";
    for (const pathName of i) {
      pth += `/${pathName}`;
      let tr_p = this.get_dir_by_path(`${pth}`);
      let ac_p = this.get_dir_by_path(`${PathSpliceLastIndex(pth).path}`);
      if (tr_p.state === SystemStateMetadata.PathNotExist) {
        let i = this.creat_dir(ac_p.data || undefined, pathName);
      }
    }
  }

  /**
   * Return directory data by path
   * @param path
   */
  public static is_file_or_dir_in_path(path: string): IfDirFileMetadata | null {
    let pth: PathSpliceMetadata = PathSpliceLastIndex(path);
    if(pth.removed){
      let i = this.get_dir_by_path(pth.path);
      if(i.state === SystemStateMetadata.PathNotExist) return null;
      let dir = !!i.data?.dir?.[pth.removed];
      let file = !!i.data?.files?.filter(f => f.fileName === pth.removed)[0];
      return {dir: dir, file: file};
    }
    console.error("SYSTEM: Removed dir is undefined");
    return null;
  }

  /**
   * Remove directory by path
   * @param path
   */
  public static remove_path(path: string): SystemStateMetadata {
    const pth: PathSpliceMetadata = PathSpliceLastIndex(path);
    if(pth.removed){
      let dir = this.get_dir_by_path(`${pth.path}/`).data;
      if(dir?.dir){
         delete dir.dir[pth.removed];
        this.remove_global_path_from_cookies(path);
        return SystemStateMetadata.Success;
      }
      return SystemStateMetadata.PathNotExist
    }
    console.error(`SYSTEM: Remove path error ${pth.path} `);
    return SystemStateMetadata.PathNotExist
  }

  /**
   * Returns dynamic files from cookies
   */
  public static get_system_dynamic_files_cookies_config():  NapicuOsCookiesFileMetadata[] | null{
    return NapicuOS.get_system_config_from_cookies()?.files || null;
  }

  /**
   * Returns dynamic paths from cookies
   */
  public static get_system_dynamic_paths_cookies_config(): string[] | null{
    return NapicuOS.get_system_config_from_cookies()?.directorys || null;
  }

  /**
   * Creat a new dynamic directory in the directory by path
   * @param path Path to the directory
   * @param dirName Name of the new directory
   */
  public static creat_dynamic_path_config(path: string, dirName: string): void { //TODO RETURN
    if (!this.check_file_name(dirName)) return;
    this.creat_path(`${path}${dirName}/`);
    this.add_global_path_to_cookies(`${path}${dirName}/`);
    this.update_config_to_cookies();
  }

  /**
   * Return dynamic path
   * @param path
   */
  protected static get_dynamic_file(path: string): SystemFileConsMetadata | SystemStateMetadata.FileNotExist{
    let pathFile: PathSpliceMetadata = PathSpliceLastIndex(path);
    let i: NapicuOsCookiesFileMetadata[] | undefined   = this.get_system_dynamic_files_cookies_config()?.filter((file:  NapicuOsCookiesFileMetadata) => {
      return file.file.fileName === pathFile.removed;
    });
    if(i!.length > 1) console.error("[NAPICUOS] Ilegal files");
    return i?.[0].file || SystemStateMetadata.FileNotExist;
  }

  /**
   * Deletes file from cookies
   * @param path
   */
  protected static remove_dynamic_file(path: string): SystemStateMetadata.Success | SystemStateMetadata.CookiesError{
    let pathFile: PathSpliceMetadata = PathSpliceLastIndex(path);
    let i: NapicuOsCookiesFileMetadata[] | null   = this.get_system_dynamic_files_cookies_config();
    if(i) {
      let b = this.get_system_dynamic_files_cookies_config()?.filter((file:  NapicuOsCookiesFileMetadata) => {
        return file.file.fileName === pathFile.removed;
      });
      if(b!.length > 1) console.error("[NAPICUOS] Ilegal files");
      if (b) this.get_system_dynamic_files_cookies_config()?.splice(this.get_system_dynamic_files_cookies_config()?.indexOf(b[0]) as number, 1)
      this.update_config_to_cookies();
      return SystemStateMetadata.Success;
    }
    return SystemStateMetadata.CookiesError;
  }

  /**
   * Deletes path from cookies
   * @param path
   */
  protected static remove_dynamic_path(path: string): SystemStateMetadata.Success | SystemStateMetadata.CookiesError | SystemStateMetadata.DirNotExist{
    let i:  NapicuOsCookiesTemplate | null = NapicuOS.get_system_config_from_cookies()
    if(i?.directorys){
      let pth_md = PathHasLastSlash(path);
      let dir_index: number = i.directorys.indexOf(pth_md);
      if (dir_index >= 0){
        i.directorys.splice(dir_index, 1);
        this.update_config_to_cookies();
        return SystemStateMetadata.Success;
      }
      return SystemStateMetadata.DirNotExist
    }
    return SystemStateMetadata.CookiesError;
  }


  /**
   * Creat a new dynamic file in the directory by path
   * @param path Path to the directory
   * @param file File
   */
  public static creat_dynamic_file(path: string, file: SystemFile): SystemStateMetadata {
    if(!this.check_file_name(file.fileName)) return SystemStateMetadata.InvalidFileDirName;
    let i = this.get_dir_by_path(path);
    if(i.state === SystemStateMetadata.PathExist) {
      let fl = this.add_file_to_dir(i.data || undefined, file); //TODO IDK
      if(fl == SystemStateMetadata.FileAddedSuccess) {
        if (!this.is_file_or_dir_in_path(`${path}${file}`)?.file){
          this.add_global_file_to_cookies(path, file);
          this.update_config_to_cookies();
        }
        return SystemStateMetadata.FileAlreadyExists;
      }
        return fl;
    }else {
      return SystemStateMetadata.PathNotExist;
    }
  }

  /**
   * Rewrite the file value
   * @param path Path to the file
   * @param value New value
   */
  public static rewrite_dynamic_file(path: string, value: string): any{
    let i: SystemStateMetadata | SystemFile = this.rewrite_file(path, value);
    if(i instanceof SystemFile) this.update_dynamic_file(path, {value: value});
  }

  /**
   * Rename the file
   * @param path Path to the file
   * @param fileName New file name
   */
  public static rename_dynamic_file(path: string, fileName: string): any { //TODO NO ANY LUL
    let i: SystemStateMetadata | SystemFile = this.rename_file(path, fileName);
    if(i instanceof SystemFile) this.update_dynamic_file(path, {fileName: fileName});
  }

  /**
   * Rename the directory name
   * @param path Path to the directory
   * @param dirName New directory name
   */
  public static rename_dynamic_path(path: string, dirName: string): any { //TODO NO ANY LUL
    let pth = this.get_system_dynamic_paths_cookies_config();
    if(!pth) return;

    //TODO REMOVE ALL USERS FILES
    //TODO REMOVE ALL USERS FILES
    //TODO REMOVE ALL USERS FILES


     this.remove_dynamic_path(path);

    let dr_nm: string = PathHasLastSlash(PathSpliceLastIndex(path).path);

    this.add_global_path_to_cookies(`${dr_nm}${dirName}/`);

    this.update_config_to_cookies();
  }

  protected static update_dependencies_path(oldPath: string, newPath: string): void {
    let paths: string[] | null = this.get_system_dynamic_paths_cookies_config();
    let files:  NapicuOsCookiesFileMetadata[] | null = this.get_system_dynamic_files_cookies_config();

    if(paths && files){
      const regex: RegExp = new RegExp(PathHasLastSlash(oldPath), 'g');
      const pth_sls: string = PathHasLastSlash(newPath);

      //Paths
      for(let i = 0; i < paths.length; i++){
        paths[i] = paths[i].replace(regex, pth_sls);
      }

      //Files
      //TODO /home/numax/home/numax/.....
      for(let i = 0; i < files.length; i++){
        files[i].path = files[i].path.replace(regex, pth_sls);
      }

      this.update_config_to_cookies();


    } else console.error("[NAPICUOS] Cookies error");
  }



  /**
   * Update the file from cookies
   * @param path Path to the file
   * @param fileData New file data
   * @protected
   */
  protected static update_dynamic_file(path: string, fileData: SystemUpdateFileConsMetadata): void {
    let i: SystemStateMetadata | SystemFile = this.get_file_by_path(path);
    if(i instanceof SystemFile){
      let fl = this.get_global_file_from_cookies(PathSpliceLastIndex(path).path);
      if(fl){
        if(fileData.fileName) fl.fileName = fileData.fileName;
        if(fileData.fileType) fl.fileType = fileData.fileType;
        if(fileData.value) fl.value = fileData.value;
        if(fileData.createdBy) fl.createdBy = fileData.createdBy;
        if(fileData.permissions) fl.permissions = fileData.permissions;
        if(fileData.iconPath) fl.iconPath = fileData.iconPath;
        this.update_config_to_cookies();
      }else {
        console.error(`SYSTEM: Rewrite value error ${path} dynamic file not found`);
      }
    }
  }

  public static creat_dynamic_document(path: string, fileName: string, value?: string): SystemStateMetadata{
    let i: SystemDocumentData = this.creat_document(fileName, value);
    if(!(i instanceof SystemFile)) return i;
    return this.creat_dynamic_file(path, i);
  }

  /**
   * Add path to global config
   * @param path
   */
  protected static add_global_path_to_cookies(path: string): void {
    const conf_paths = this.get_system_dynamic_paths_cookies_config();
    if (!conf_paths) return;
    for (const i of conf_paths) {
      if (i === path) {
        return;
      }
    }
    conf_paths.push(PathHasLastSlash(path));
  }

  /**
   * Remove path from global config
   * @param path
   * @protected
   */
  protected static remove_global_path_from_cookies(path: string): void {
    const conf_paths = this.get_system_dynamic_paths_cookies_config();
    if (!conf_paths) return;
    for (const i of conf_paths) {
      if (i === path) {
        conf_paths.splice(conf_paths.indexOf(i), 1);
        this.update_config_to_cookies();
      }
    }
  }

  /**
   * Remove file from global config
   * @param path Path
   * @param fileName File name
   */
  protected static remove_global_file_from_cookies(path: string, fileName: string): void {
    const conf_files = this.get_system_dynamic_files_cookies_config();
    if (!conf_files) return;
    for (const i of conf_files) {
      if (i.file.fileName === fileName && IsPathMatch(i.path, path)) {
        conf_files.splice(conf_files.indexOf(i), 1);
        this.update_config_to_cookies();
      }
    }
  }

  /**
   * Add file to global config
   * @param path
   * @param file
   */
  protected static add_global_file_to_cookies(path: string, file: SystemFileConsMetadata): SystemStateMetadata {
    const cfg: NapicuOsCookiesTemplate | null = this.get_system_config_from_cookies();
    if (!cfg) return SystemStateMetadata.CookiesError;
    for (const i of cfg?.files) {
      if (i.file.fileName === file.fileName && i.path === path) {
        //TODO return rewrite or error handler
        i.file = file;
        return SystemStateMetadata.FileAddedSuccess;
      }
    }
    cfg.files.push({path: path, file: file});
    return SystemStateMetadata.FileAddedSuccess;
  }

  /**
   * Get file from global config by path
   * @param path Path
   */
  protected static get_global_file_from_cookies(path: string): SystemFileConsMetadata | null {
    if(!path.endsWith("/")) path += "/";
    const cfg:  NapicuOsCookiesTemplate | null = this.get_system_config_from_cookies();
    if (!cfg) return null;
    for (const i of cfg?.files) {
      if (i.path === path) {
        return i.file;
      }
    }
    return null;
  }

  /**
   * Creates a new directories in the directory
   * @param dir The name of the directory in which you want to create the directory
   * @param dirsNames Name of the new directory
   */
  public static creat_dirs(dir: systemDirAFileMetadata | undefined, dirsNames: string[]):
    SystemDirStateData {
    if (!dir) return SystemStateMetadata.PathNotExist;
    if (!dir.dir) dir.dir = {}
    let state: SystemDirStateData = SystemStateMetadata.DirNotExist;
    for (const dir_name of dirsNames) {
      if (!this.check_file_name(dir_name)) return SystemStateMetadata.InvalidFileDirName;
      let i = this.creat_dir(dir, dir_name);
      if (i === SystemStateMetadata.DirExist) {
        state = SystemStateMetadata.DirExist;
        break;
      }
    }
    return state;
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
      let file = this.get_file_by_file_name(this.get_usr_dir(), App.processTitle);
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
   * Returns the user home folder by username
   */
  public static get_user_home_path(username: string | undefined): string | null {
    let user_pth: string = `/home/${username}`;
    let i = this.get_dir_by_path(user_pth);
    if (!i.data) return null;
    return user_pth;
  }

  /**
   * Returns the user home folder of the active user
   */
  public static get_active_user_home_path(): string | null {
    return this.get_user_home_path(this.get_active_user()?.username + "/");
  }

  /**
   * Returns the logged-in user.
   */
  public static get_active_user(): User | undefined {
    return this.get_user_by_username(this.SystemCookiesConfig.user.activeUser); //TODO WTF ?
  }

  /**
   * Returns the logged-in user username.
   */
  public static get_active_user_username(): string | undefined {
    return this.get_active_user()?.username
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
          createdBy: "root"
        })
      );
      return SystemStateMetadata.RegisterCommandSuccess;
    } else {
      return SystemStateMetadata.RegisterCommandAlreadyExists;
    }
  }

  /**
   * Executes the command
   * @param data
   */
  public static async run_command(data: CommandParams): Promise<CommandFunMetadata> {
    let i: SystemFile = NapicuOS.get_command_by_commandStr(data.cmd);
    if (i) {
      if (
        i.permissions.read ===
        SystemUserPermissionsEnumMetadata.SuperUser &&
        this.get_active_user()?.permissions !==
        SystemUserPermissionsEnumMetadata.SuperUser
      ) {
        return {
          linesForCMD: [new Line(`${data.cmd}: Permission denied`, 'red')],
          stateCode: CommandStateCodeMetadata.PermissionsError,
        };
      }
      return await i.open({params: data.args, terminal: data.terminal});
    } else {
      return {
        linesForCMD: [new Line(`${data.cmd}: command not found`, 'red')],
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
    if (!this.check_file_name(file.fileName)) return SystemStateMetadata.InvalidFileDirName;
    if (dir) {
      if (!dir.files) dir.files = [];
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
   * Adds a directory to the directory
   * @param path Path to the directory
   * @param file File to be added
   */
  public static add_file_to_dir_by_path(path: string, file: SystemFile):  SystemFileStateData | ReturnGetDirByPathMetadata{
    let dir: ReturnGetDirByPathMetadata = this.get_dir_by_path(path);
    if (dir.data?.dir) {
      return this.add_file_to_dir(dir.data, file);
    }
    return dir;
  }

  /**
   * Function to creat document in directory
   * @param path Path to which the document should be added
   * @param fileName File name
   */
  public static add_blank_document_to_dir(path: string, fileName: string): SystemFileStateData {
    let i: ReturnGetDirByPathMetadata = this.get_dir_by_path(path);
    let doc: SystemDocumentData = this.creat_document(fileName);
    if(!(doc instanceof SystemFile)) return doc;
    return this.add_file_to_dir(i.data || undefined, doc);
  }

  /**
   * Return blank document
   * @param fileName Document name
   * @param value Document value
   */
  public static creat_document(fileName: string, value?: string): SystemDocumentData{
    if(!this.check_file_name(fileName)) return SystemStateMetadata.FileHasBadName;
    return new SystemFile({
      fileName: fileName,
      createdBy: this.get_active_user_username(),
      value: value || '',
      fileType: SystemFileTypeEnumMetadata.document,
      iconPath: SYSTEM_IMAGES.AppDocText,
    })
  }

  /**
   * Opens a file in a specific directory
   * @param dir The directory in which you want to open the specific file
   * @param args Arguments
   */
  public static open_file_in_dir(
    dir: systemDirAFileMetadata | undefined,
    args: string[]
  ):
    | SystemStateMetadata.DirNotExist
    | SystemStateMetadata.FileNotExist
    | SystemStateMetadata.FileOpenSuccess {

    let file = this.get_file_by_file_name(dir, args[0]);
    if (file !== SystemStateMetadata.DirNotExist) {
      if (file !== SystemStateMetadata.FileNotExist) {
        //TODO Return Promise
        args.shift()
        file.open({params: args});
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
  public static get_file_by_file_name(dir: systemDirAFileMetadata | undefined, fileName: string):
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
   * Return the file you are looking for by path
   * @param path
   */
  public static get_file_by_path(path: string): SystemStateMetadata | SystemFile {
    let i:  PathSpliceMetadata = PathSpliceLastIndex(ReplaceSystemVariables(path));
    let fileName: string | undefined = i.removed;
    let dir = this.get_dir_by_path(i.path);
    if(fileName && dir.state === SystemStateMetadata.PathExist){
      let file: SystemFile| undefined = dir.data?.files?.filter((value: SystemFile) => {
        return value.fileName === fileName;
      })[0];
      if(!file) return SystemStateMetadata.FileNotExist;
      return file;
    }
    return SystemStateMetadata.PathNotExist;
  }

  /**
   * Returns the dir you are looking for
   * @param dir The directory in which you want to search for a specific file
   * @param dirName Directory name
   */
  public static get_dir_by_dir_name(dir: systemDirAFileMetadata | undefined, dirName: string):
    systemDirAFileMetadata
    | SystemStateMetadata.DirNotExist
    | SystemStateMetadata.FileNotExist {
    if (dir?.files) {
      if (dir.dir?.[dirName]) return dir.dir?.[dirName];
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
    NapicuOS.run_command({cmd: SystemCommandsPrefixEnum.addUserCommand, args: [username, password]});
  }

  /**
   * Launches the installed application
   * @param ApplicationProcessTitle Filename of the installed application (ProcessTitle)
   * @param params Parameters to be passed to the application
   */
  public static open_app(ApplicationProcessTitle: string, params?: string[]): any {
    let i: string[] = params || [];
    i.unshift(ApplicationProcessTitle);
    NapicuOS.run_command({cmd: SystemCommandsPrefixEnum.openAppCommand, args: i});
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
        const config = this.get_system_config_from_cookies();
        if (config) config.user.users.push(user);
        //this.creat_dirs(user.userSetting.drives.dir?.["home"], SYSTEM_DEFAULT_HOME_FOLDERS);
        this.creat_dynamic_path_config(`/home/`, user.username);
        this.creat_user_home_dirs(user.username);

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
   * Sets a new username for the user
   * @param username
   * @param newUsername
   */
  public static set_user_name(username: string , newUsername: string): SystemUserStateData | SystemStateMetadata.Success{
    let ck_usr_name: SystemUserStateData = this.check_username(newUsername);
    if(ck_usr_name === SystemStateMetadata.UserNotExists){
      this.SystemCookiesConfig.user.users.filter((user: UserConstructorMetadata) => {
        return user.username === username
      })[0].username = newUsername;
      this.rename_user_home_folder(username, newUsername);
      this.update_config_to_cookies();
      return SystemStateMetadata.Success
    }
    return ck_usr_name;
  }

  protected static rename_user_home_folder(username: string, newUsername: string): void {
    // this.creat_dynamic_path_config(`/home/`, user.username);
    this.rename_dynamic_path( `/home/${username}/`, newUsername);
    this.update_dependencies_path(`/home/${username}/`, `/home/${newUsername}/`);
  }

  /**
   * Checks the username
   * @param username
   */
  public static check_username(username: string): SystemUserStateData {
    let lng = checkSystemStringLength(username, SYSTEM_USERS_MIN_LENGTH, SYSTEM_USERS_MAX_LENGTH);
    if(lng == SystemStateMetadata.StringCorrect){
      if(this.check_user_exist(username)){
       return SystemStateMetadata.UserExists;
      }
      return SystemStateMetadata.UserNotExists;
    }
    return lng;
  }

  /**
   * Checks the existence of the user
   * @param username
   */
  public static check_user_exist(username: string): boolean{
    return !!this.get_user_by_username(username);
  }

  /**
   * creates user folders
   * @protected
   */
  protected static creat_user_home_dirs(username: string): void {
    // let home_dir: ReturnGetDirByPathMetadata = this.get_dir_by_path(`/home/${username}/`);
    let home_dir: systemDirAFileMetadata | undefined = this.get_home_dir()?.dir?.[username];
    if(!home_dir) console.error("[NAPICUOS] Home doesn't exist ")
    this.creat_dirs(home_dir || undefined, SYSTEM_DEFAULT_HOME_FOLDERS);
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
   * Add and preload new sound
   * @param soundName Sound's name
   * @param src Sound's source
   */
  public static add_sound_to_system(soundName: string, src: string): Promise<SystemFileStateData | void> {
    return new Promise<SystemFileStateData>(async (resolve, reject) => {

      let file = new SystemFile({
        fileName: soundName,
        value: src,
        fileType: SystemFileTypeEnumMetadata.audio,
        createdBy: "root"
      });
      await audioPreloader(src).catch(() => {
        console.error("SYSTEM: Error loading sound: " + src);
        reject();
      });

      return resolve(this.add_file_to_dir(this.get_sounds_dir(), file));
    });
  }

  /**
   * Add and preload new sound
   * @param imageName Image's name
   * @param src Image's source
   */
  public static add_image_to_system(imageName: string, src: string): Promise<SystemFileStateData | void> {
    return new Promise<SystemFileStateData>(async (resolve, reject) => {

      let file = new SystemFile({
        fileName: imageName,
        value: src,
        fileType: SystemFileTypeEnumMetadata.image,
        createdBy: "root"
      });
      await imagePreloader(src).catch(() => {
        console.error("SYSTEM: Error loading image: " + src);
        reject();
      });

      return resolve(this.add_file_to_dir(this.get_images_dir(), file));
    });
  }

  /**
   * Get the system's sound
   * @param soundName
   */
  public static get_sound_system_src(soundName: string): SystemStateMetadata.DirNotExist | SystemStateMetadata.FileNotExist | string {
    let gt_dir = this.get_file_by_file_name(this.get_sounds_dir(), soundName);
    if (gt_dir instanceof SystemFile) {
      return gt_dir.value;
    } else {
      return gt_dir;
    }
  }

  /**
   * Mount a folder to the system
   * @param dir
   * @param mountedDir
   */
  public static mount_folder(dir: systemDirAFileMetadata | undefined, mountedDir: systemDirMetadata | undefined): void {
    if (!dir || !mountedDir) return
    if (!dir.dir) dir.dir = {};
    dir.dir = mountedDir;
  }

  /**
   * Retruns the user's home directory
   * @param username
   */
  public static get_user_home_dir(username: string): systemDirAFileMetadata | SystemStateMetadata.DirNotExist {
    return NapicuOS.get_home_dir()?.dir?.[username] || SystemStateMetadata.DirNotExist;
  }

  /**
   * Return the active user's home directory
   */
  public static get_active_user_home_dir(): systemDirAFileMetadata | SystemStateMetadata.DirNotExist {
    let active_user = this.get_active_user();
    if (active_user) return this.get_user_home_dir(active_user.username);
    return SystemStateMetadata.DirNotExist;
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
      createdBy: "root"
    });

    if (this.add_file_to_dir(this.get_usr_dir(), Application) === SystemStateMetadata.FileAlreadyExists) {
      console.error("CreatAppFile Error - File already exists");
    }
    if (data.addToDock) User.defaultUserSettings.appsInDock.push(Application.fileName);
    this.add_app_to_activity_menu(Application);
  }

  /**
   * Convert AppCreation to Process metadata
   * @param data
   */
  public static creat_installation_cnt(data: AppCreatMetadata): processConstructor {
    return {
      processTitle: data.processTitle,
      Window: new Window({
        windowTitle: data.appTitle,
        component: data.appComponent,
        windowData: data.windowData || Window.defaultWindowAppData,
        windowButtons: data.windowButtons,
        resizeAllowed: data.resizeAllowed,
      }),
      multiRun: data.multiRun,
    }
  }

  /**
   * Creates and opens a new system alert
   */
  public static alert(title: string, value: string, type: systemAlertImagesEnumMetadata): void {
    new Process({processTitle: 'SystemAlert', Window: new SystemAlert(title, value, type)}).run()?.Window.open();
  }

  //TODO DOC
  /**
   * Creates and opens a new system alert with input
   */
  public static input_alert(title: string, value: string, icon?: string, buttonType?: InputButtonTypeMetadata): Promise<string | null> {
    return new Promise((resolve) => {
      new Process({
        processTitle: 'SystemAlert',
        Window: new SystemInputAlert(title, value, icon, buttonType, resolve)
      }).run()?.Window.open();
    });
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
    const file = this.get_file_by_file_name(this.get_usr_dir(), filename);
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

  /**
   * Checks the filename
   * @param value
   */
  public static check_file_name(value: string): boolean {
    return SYSTEM_FILE_NAME_REGEX.test(value);
  }

  /**
   * Returns button type
   */
  public static get_button_type_creat_cancel(): InputButtonTypeMetadata{
    return {
      submit: this.get_language_words().other.creat.creat_any,
      reject: this.get_language_words().other.cancel_any
    }
  }
}
