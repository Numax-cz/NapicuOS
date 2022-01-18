import { Process } from './Process';
import { SystemFileConsMetadata, SystemFileTypeMetadata } from './Systems/NapicuOS/interface/FilesDirs/file';

export class SystemFile {
  //TODO DOC

  /**
   * Default icons directory
   */
  public static readonly defaultIconsPath: string = '/assets/systems/NapicuOS/SystemIcons';
  /**
   * Path to the icon (svg)
   */
  private iconPath: string = `${SystemFile.defaultIconsPath}/XFD/download.svg`;

  public value: any;

  private declare fileType: SystemFileTypeMetadata;

  public fileName: string = 'New_File';

  private permission: any;

  //TODO DOC
  /**
   * @param value
   * @param fileName
   * @param fileType
   * @param permission
   */
  constructor(data: SystemFileConsMetadata) {
    this.value = data.value;
    this.fileName = data.fileName;
    this.fileType = data.fileType;
    //TODO permissions
  }

  public open(): void {
    switch (this.fileType) {
      case 'executable':
        var x = this.value as Process;
        x.run().Window.open();

        break;

      default:
        break;
    }
  }
}
