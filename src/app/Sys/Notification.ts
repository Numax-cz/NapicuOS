import {SystemNotificationConstructorMetadata} from "./Systems/NapicuOS/interface/notification";
import {NapicuOS} from "./Systems/NapicuOS/system.napicuos";
import {time_format_MHA} from "./Systems/NapicuOS/config/time";

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

  constructor(data: SystemNotificationConstructorMetadata) {
    this.title = data.title;
    this.msg = data.msg;
    this.icon = data.icon || "/assets/systems/NapicuOS/SystemIcons/XFD/notification.webp";
    this.time = NapicuOS.getTimeByFormat(time_format_MHA);
  }
}
