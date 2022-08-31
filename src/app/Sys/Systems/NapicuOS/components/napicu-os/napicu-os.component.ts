import {animate, query, stagger, state, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/Sys/Systems/NapicuOS/SystemComponents/Process';
import {BOOT_ANIMATION_TIME} from '../../config/Boot';
import {NapicuOS} from '../../system.napicuos';
import {SystemFile} from 'src/app/Sys/Systems/NapicuOS/SystemComponents/File';
import {SystemDockDisplay} from "../../interface/System/dock";
import {WindowComponent} from "../../template/window/window.component";
import {SystemNotification} from "../../SystemComponents/Notification";
import {NOTIFICATION_ANIMATION_TIME} from "../../config/NotificationAnimations";
import {NapicuCalendarDateMetadata} from "../../interface/Calendar/calendar";
import {SystemCalendarMetadata} from "../../interface/System/Calendar";
import {WINDOW_ANIMATION_TIME} from "../../config/WindowAnimations";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemCommandsPrefixEnum} from "../../config/commands/Commands";
import {NapicuDate} from "napicuformatter";

@Component({
  selector: 'app-napicu-os',
  templateUrl: './napicu-os.component.html',
  styleUrls: ['./napicu-os.component.scss'],
  animations: [
    trigger('NapicuOSfeoreStartUp', [
      transition('* => *', [
        query(
          ':self',
          stagger('20ms', [
            style({
              transform: 'scale(0.2) rotateX(70deg)',
              opacity: 0,
              transformOrigin: 'bottom',
            }),
            animate(`${BOOT_ANIMATION_TIME}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
    trigger('NapicuOSfeoreNotification', [
      transition(':enter', [
        style({transform: 'translate(-50%, -125%)', opacity: 0}),
        animate(NOTIFICATION_ANIMATION_TIME, style({transform: 'translate(-50%, 0)', opacity: 1})),
      ]),
      transition(':leave', [
        style({transform: 'translate(-50%, 0)', opacity: 1}),
        animate(NOTIFICATION_ANIMATION_TIME, style({transform: 'translate(-50%, -125%)', opacity: 0})),
      ]),
    ]),

    trigger('NapicuOSfeoreActivityMenu', [
      state(
        'true',
        style({
          transform: 'scale(0.4) ',
          opacity: 1,
          transformOrigin: 'top',
          borderRadius: '40px',
        }),
      ),
      transition(`* => *`, animate(WINDOW_ANIMATION_TIME)),
    ]),
  ],
})
export class NapicuOSComponent implements OnInit {
  public static BottomDockDisplay: boolean = false;
  public static DataDisplay: boolean = false;
  public static ActivityDisplay: boolean = false;
  public static BottomDockProcess: SystemDockDisplay[] = [];
  public static ActivityMenuApps: SystemFile[] = [];
  public static NotificationsFront: SystemNotification[] = [];
  public static NotificationActive: SystemNotification | null = null;
  public static ToolsContextMenuDisplay: boolean = false;
  public selectedAppContext: number | null = null;
  public selectedAppProperties: number | null = null;
  public static CalendarMenu: SystemCalendarMetadata = {
    calendar: [],
    selectedMonth: 0,
    fullDate: null,
  }

  constructor() {

  }

  get systemTime(): string {
    return NapicuOS.get_system_time();
  }

  get wallpaper(): string {
    return NapicuOS.get_active_user_wallpaper();
  }

  get GetBottomDockProcess(): SystemDockDisplay[] {
    return NapicuOSComponent.BottomDockProcess;
  }

  get GetDateDisplay(): boolean {
    return NapicuOSComponent.DataDisplay;
  }

  get SystemBoot(): boolean {
    return NapicuOS.get_system_boot();
  }

  get Process(): Process[] {
    return NapicuOS.get_system_process();
  }

  get BottomDockDisplay(): boolean {
    return NapicuOS.get_system_bottom_dock_display();
  }

  ngOnInit(): void {
    NapicuOSComponent.BottomDockDisplay = true;
    NapicuOSComponent.ActivityDisplay = false;
    window.addEventListener('mousedown', (e: MouseEvent) => {
      let p = e.target as HTMLElement;
      if (
        !p.offsetParent?.getAttribute('clickable')
      ) {
        this.closeAppContextMenu();
        this.closeAppPropertiesMenu();
        this.closeOffContextMenu();
        NapicuOSComponent.DataDisplay = false;
      }
      //e.preventDefault();
    });
  }

  public dockRunner(file: SystemFile, running: boolean): void {

    if (!running) {
      NapicuOS.open_app(file.fileName);
    } else {
      const windows = NapicuOS.get_apps_running_by_process_title(file.fileName)
      let x = NapicuOS.get_apps_running_by_process_title(file.fileName);
      let p: Process;

      let windowsMin = windows.filter((i: Process) => {
        return !i.Window.display;
      });
      if (windowsMin.length) {
        p = windowsMin.sort((a: Process, b: Process) => {
          return a.Window.z_index - b.Window.z_index
        })[windowsMin.length - 1];
      } else {
        p = x.sort((a: Process, b: Process) => {
          return a.Window.z_index - b.Window.z_index
        })[x.length - 1]; //TODO INDEX ON MINIM
      }
      let i = WindowComponent.WindowHistory.indexOf(p.Window);
      if (WindowComponent.selectedWindow) WindowComponent.selectedWindow.activated = false;
      WindowComponent.switchWindowIndex(p.Window, i);
    }
    if (WindowComponent.selectedWindow && !WindowComponent.selectedWindow.display) {
      WindowComponent.selectedWindow.display = true;
    }
  }

  public openFile(file: SystemFile): void {
    NapicuOS.open_app(file.fileName);
    this.closeAppContextMenu();
    this.closeAppPropertiesMenu();
    NapicuOSComponent.closeActivityMenu();
  }

  public pinFunFileInContextMenu(file: SystemFile, index: number, pinned: boolean): void {
    if (pinned) {
      NapicuOS.remove_file_from_dock_by_index(index);
    } else {
      NapicuOS.add_file_to_dock(file);
    }
    NapicuOS.update_dock_items();
    this.closeAppContextMenu();
  }

  /**
   * Open the context calendar menu
   */
  public onClickDate(): void {
    NapicuOSComponent.CalendarMenu.selectedMonth = NapicuOS.getTime().getCurrentMonth() - 1;
    NapicuOS.update_calendar();
    NapicuOSComponent.closeActivityMenu();
    this.openNotificationMenu();
  }

  public onClickSettings(): void {
    NapicuOS.run_command({cmd: SystemCommandsPrefixEnum.settingsCommand});
    this.closeOffContextMenu();
  }

  public onClickLock(): void {
    NapicuOS.logout_user();
  }

  public onClickOff(): void {
    NapicuOS.shutDown();
  }

  public openNotificationMenu(): void {
    if (!NapicuOSComponent.DataDisplay) {
      NapicuOSComponent.NotificationActive = null
    }
    NapicuOSComponent.DataDisplay = !NapicuOSComponent.DataDisplay;
  }

  public onRightClick(index: number, event: Event): void {
    this.selectedAppContext = index;
    event.preventDefault();
  }

  public clearNotifications(): void {
    const user = NapicuOS.get_active_user();
    if (user) NapicuOS.clear_user_notification(user);
  }

  public onCloseNotification(): void {
    const user = NapicuOS.get_active_user();
    if (user) {
      let x = user.userSetting.notifications.notificationsList || [];
      user.userSetting.notifications.notificationsList.splice(x.length - 1, 1);
    }

    NapicuOSComponent.NotificationActive = null;
  }

  public changeUserNotificationReceive(): void {
    const userConfig = NapicuOS.get_active_user()?.userSetting.notifications;
    if (userConfig) {
      userConfig.receive = !userConfig.receive;
    }
  }

  protected closeAppContextMenu(): void {
    this.selectedAppContext = null;
  }

  protected closeAppPropertiesMenu(): void {
    this.selectedAppProperties = null;
  }

  protected closeOffContextMenu(): void {
    NapicuOSComponent.ToolsContextMenuDisplay = false;
  }

  public arrowLeft(): void {
    NapicuOSComponent.CalendarMenu.selectedMonth--;
    if (NapicuOSComponent.CalendarMenu.selectedMonth < 0) NapicuOSComponent.CalendarMenu.selectedMonth = 11;
    NapicuOS.update_calendar();
  }

  public arrowRight(): void {
    NapicuOSComponent.CalendarMenu.selectedMonth++;
    if (NapicuOSComponent.CalendarMenu.selectedMonth > 11) NapicuOSComponent.CalendarMenu.selectedMonth = 0;
    NapicuOS.update_calendar();
  }

  /**
   * This function is called when the user clicks on the notification
   */
  public onNotificationClick(): void {
    const i = this.GetNotification;
    const command = i?.command;
    if (command) {
      NapicuOS.run_command({cmd: command.commandName, args: command.args || []});
      this.onCloseNotification()
    }
  }

  /**
   * This function is called when the user clicks on the activities button
   */
  public onClickActivities(): void {
    if (NapicuOSComponent.ActivityDisplay) {
      NapicuOSComponent.closeActivityMenu();
    } else {
      NapicuOSComponent.openActivityMenu();
    }
  }

  public onClickToolsContextMenuDisplay(): void {
    if (NapicuOSComponent.ToolsContextMenuDisplay) {
      NapicuOSComponent.closeToolsContextMenuDisplay();
    } else {
      NapicuOSComponent.openToolsContextMenuDisplay();
    }
  }

  /**
   * This function is called when the user clicks on app in activities menu
   */
  public openAppProperties(index: number, event: Event): void {
    this.selectedAppProperties = index;
    event.preventDefault();
  }

  /**
   * This function is called when the user clicks on day in calendar
   */
  public onClickDayInCalendar(selectedDay: NapicuCalendarDateMetadata): void { //TODO
    const selectedYear: number = NapicuOSComponent.CalendarMenu.selectedMonth;
  }

  public static closeActivityMenu(): void {
    NapicuOS.disable_window_manager();
    NapicuOSComponent.ActivityDisplay = false;
  }

  public static openActivityMenu(): void {
    NapicuOS.enable_window_manager();
    NapicuOSComponent.ActivityDisplay = true;
  }

  public static openToolsContextMenuDisplay(): void{
    this.ToolsContextMenuDisplay = true;
  }

  public static closeToolsContextMenuDisplay(): void{
    this.ToolsContextMenuDisplay = false;
  }

  public onClickDesktop(): void {
    NapicuOSComponent.closeActivityMenu();
  }

  get GetNotification(): SystemNotification | null {
    return NapicuOSComponent.NotificationActive;
  }

  get GetUserNotificationA(): boolean {
    return NapicuOS.get_active_user_notification_receive();
  }

  get GetDoNoDisturbText(): string {
    return NapicuOS.get_language_words().other.do_not_disturb;
  }

  get GetNotificationsMenu(): SystemNotification[] {
    return NapicuOS.get_active_user()?.userSetting.notifications.notificationsList || [];
  }

  get GetNotificationCalendar(): NapicuCalendarDateMetadata[][] {
    return NapicuOSComponent.CalendarMenu.calendar;
  }

  get GetDate(): number {
    return NapicuOS.getTime().getCurrentDate();
  }

  get GetShortDays(): string[] {
    return NapicuDate.getLanguageShortsDays();
  }

  get GetSelectedMonthName(): string {
    return NapicuOS.get_language_words().Months[NapicuOSComponent.CalendarMenu.selectedMonth];
  }

  get GetOutOfMonth(): boolean {
    return NapicuOSComponent.CalendarMenu.selectedMonth != NapicuOS.getTime().getCurrentMonth() - 1;
  }

  get GetFullDate(): string {
    return NapicuOSComponent.CalendarMenu.fullDate || "NULL";
  }

  get GetDayName(): string {
    return NapicuOS.getTime().getCurrentDayName();
  }

  get GetActivityDisplay(): boolean {
    return NapicuOSComponent.ActivityDisplay;
  }

  get GetActivityMenuApps(): SystemFile[] {
    return NapicuOSComponent.ActivityMenuApps;
  }

  get GetToolsContextMenuDisplay(): boolean{
    return NapicuOSComponent.ToolsContextMenuDisplay;
  }

  get GetSettingsImage(): string {
    return SYSTEM_IMAGES.settings
  }

  get GetLockImage(): string {
    return SYSTEM_IMAGES.lock;
  }

  get GetShutdownImage(): string {
    return SYSTEM_IMAGES.shutdown;
  }

  get GetUserDarkTheme(): boolean{
    return NapicuOS.get_active_user_dark_theme();
  }

  get NotificationText(): string {
    return NapicuOS.get_language_words().CalendarMenu.notification.title;
  }

  get NoNotificationText(): string {
    return NapicuOS.get_language_words().CalendarMenu.notification.notNotification;
  }
}
