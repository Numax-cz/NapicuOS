import {
  SystemNotificationCommandMetadata,
  SystemNotificationConstructorMetadata
} from "../interface/notification";
import {NapicuOS} from "../system.napicuos";
import {time_format_MHA} from "../config/time";

export class SystemNotification {
  /**
   * Notification name
   */
  public declare readonly title: string;
  /**
   * Notification description
   */
  public declare readonly msg: string;
  /**
   * Notification icon
   */
  public declare readonly icon: string;
  /**
   * Notification time
   */
  public declare readonly time: string;
  /**
   * Notification on click callback command
   */
  public declare readonly command?: SystemNotificationCommandMetadata

  constructor(data: SystemNotificationConstructorMetadata) {
    this.title = data.title;
    this.msg = data.msg;
    this.icon = data.icon || "/assets/systems/NapicuOS/SystemIcons/XFD/notification.webp";
    this.time = NapicuOS.getTimeByFormat(time_format_MHA);
    this.command = data.command;
  }
}
