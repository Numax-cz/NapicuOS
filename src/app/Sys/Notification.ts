import {SystemNotificationConstructorMetadata} from "./Systems/NapicuOS/interface/notification";
import {NapicuOSComponent} from "./Systems/NapicuOS/components/napicu-os/napicu-os.component";
import {NapicuOS} from "./Systems/NapicuOS/system.napicuos";
import {time_format_MH} from "./Systems/NapicuOS/config/time";

export class SystemNotification {

  /**
   * Notification name
   */
  public declare readonly _title: string;
  /**
   * Notification description
   */
  public declare readonly _msg: string;
  /**
   * Notification icon
   */
  public declare readonly _icon: string;
  /**
   * Notification time
   */
  public declare readonly _time: string;


  constructor(data: SystemNotificationConstructorMetadata) {
    this._title = data.title;
    this._msg = data.msg;
    this._icon = data.icon;
    this._time = NapicuOS.getTimeByFormat(time_format_MH);
  }

  public push(): void {

  }

  public get title(): string {
    return this._title;
  }

  public get msg(): string {
    return this._msg;
  }

  public get icon(): string {
    return this._icon;
  }

  public get time(): string {
    return this._time;
  }
}
