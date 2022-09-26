import {SystemRemindNotificationConstructorMetadata} from "../interface/RemidNotification";

export class SystemRemindNotification {

  public declare title: string;
  public declare value: string
  public declare timeSpan: number;

  constructor(data: SystemRemindNotificationConstructorMetadata) {
    this.title = data.title;
    this.value = data.value;
    this.timeSpan = data.timeSpan;
  }
}
