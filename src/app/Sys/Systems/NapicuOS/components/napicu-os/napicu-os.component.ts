import {animate, query, stagger, style, transition, trigger,} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/Sys/Process';
import {boot_animation_time} from '../../config/boot';
import {wallpaper} from '../../config/wallpaper';
import {NapicuOS} from '../../system.napicuos';
import {SystemFile} from 'src/app/Sys/File';
import {SystemDockDisplay} from "../../interface/System/dock";
import {WindowComponent} from "../../template/window/window.component";
import {SystemNotification} from "../../../../Notification";
import {notification_animations} from "../../config/notificationAnimations";

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
            animate(`${boot_animation_time}ms ease-in-out`),
          ])
        ),
      ]),
    ]),
    trigger('NapicuOSfeoreNotification', [
      transition(':enter', [
        style({transform: 'translate(-50%, -125%)', opacity: 0}),
        animate(notification_animations, style({transform: 'translate(-50%, 0)', opacity: 1})),
      ]),
      transition(':leave', [
        style({transform: 'translate(-50%, 0)', opacity: 1}),
        animate(notification_animations, style({transform: 'translate(-50%, -125%)', opacity: 0})),
      ]),
    ]),
  ],
})
export class NapicuOSComponent implements OnInit {
  /**
   * Determines if the bottom dock is displayed
   */
  public static BottomDockDisplay: boolean = false;

  /**
   * Specifies whether to display the context menu with the date
   */
  public static DataDisplay: boolean = false;
  public static BottomDockProcess: SystemDockDisplay[] = [];
  public static NotificationsMenuItems: SystemNotification[] = [];
  public static NotificationActive: SystemNotification | null = null;
  public selectedAppContext: number | null = null;

  constructor() {
  }

  get systemTime(): string {
    return NapicuOS.get_system_time();
  }

  get wallpaper(): string {
    return wallpaper;
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
    window.addEventListener('mousedown', (e: MouseEvent) => {
      let p = e.target as HTMLElement;
      if (
        !p.offsetParent?.classList.contains("napicu-os-clickable")
      ) {
        this.closeAppContextMenu();
        NapicuOSComponent.DataDisplay = false;
      }
      //e.preventDefault();
    });
  }

  public dockRunner(file: SystemFile, running: boolean): void {
    if (WindowComponent.selectedWindow && !WindowComponent.selectedWindow.display) WindowComponent.selectedWindow.display = true;
    if (!running) {
      NapicuOS.open_app(file.fileName);
    } else {
      let p = NapicuOS.get_apps_running_by_process_title(file.fileName)[0]; //TODO INDEX
      let i = WindowComponent.WindowHistory.indexOf(p.Window);
      if (WindowComponent.selectedWindow) WindowComponent.selectedWindow.activated = false;
      WindowComponent.switchWindowIndex(p.Window, i);
    }
  }

  public openFileInContextMenu(file: SystemFile): void {
    NapicuOS.open_app(file.fileName);
    this.closeAppContextMenu();
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

  public clickDate(): void {
    NapicuOSComponent.DataDisplay = !NapicuOSComponent.DataDisplay;
  }

  public onRightClick(index: number, event: Event): void {
    this.selectedAppContext = index;
    event.preventDefault();
  }

  protected closeAppContextMenu(): void {
    this.selectedAppContext = null;
  }

  get GetNotification(): SystemNotification | null {
    return NapicuOSComponent.NotificationActive;
  }

  get GetNotificationsMenu(): SystemNotification[] {
    return NapicuOSComponent.NotificationsMenuItems;
  }
}
