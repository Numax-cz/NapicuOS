import {SystemNotificationConstructorMetadata} from "./Systems/NapicuOS/interface/notification";

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


  constructor(data: SystemNotificationConstructorMetadata) {
    this._title = data.title;
    this._msg = data.msg;
    this._icon = data.icon;
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
}
