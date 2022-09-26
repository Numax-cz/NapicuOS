export declare interface SystemNotificationConstructorMetadata {
  title: string,
  msg: string,
  icon?: string,
  command?: SystemNotificationCommandMetadata
}


export declare interface SystemNotificationCommandMetadata {
  commandName: string,
  args?: string[]
}
