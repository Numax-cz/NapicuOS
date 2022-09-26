import {SystemRemindNotification} from "../SystemComponents/RemindNotification";

/**
 * Script to check if a reminder notification has expired
 * * **True** - Notification has not expired
 * * **False** - Notification has expired
 * @param notification
 */
export function checkIsRemindNotificationExpired(notification: SystemRemindNotification): boolean {
  const notificationTime = notification.timeSpan;
  const nowTime: number = new Date().getTime();
  return notificationTime <= nowTime;
}
