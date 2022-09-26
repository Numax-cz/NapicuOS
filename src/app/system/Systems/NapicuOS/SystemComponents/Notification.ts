import {SystemNotificationCommandMetadata, SystemNotificationConstructorMetadata} from "../interface/Notification";
import {NapicuOS} from "../system.napicuos";
import {TIME_FORMAT_MHA} from "../config/Time";

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
    this.time = NapicuOS.getTimeByFormat(TIME_FORMAT_MHA);
    this.command = data.command;
  }
}
