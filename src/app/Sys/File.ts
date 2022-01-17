
export class SystemFile {
  /**
   * Default icons directory
   */
  public static readonly defaultIconsPath: string = '/assets/systems/NapicuOS/SystemIcons';
  /**
   * Path to the icon (svg)
   */
  public iconPath: string = `${SystemFile.defaultIconsPath}/XFD/download.svg`;
  constructor() {}

  public onOpen(): void {}
}
