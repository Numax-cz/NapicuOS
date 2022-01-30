import { Command } from './command';
import { Process } from './Process';
import {
  SystemFileConsMetadata,
  SystemFileTypeEnumMetadata,
} from './Systems/NapicuOS/interface/FilesDirs/file';
import { SystemFilePermissionsMetadata } from './Systems/NapicuOS/interface/permissions';
import { SystemUserPermissionsEnumMetadata } from './Systems/NapicuOS/interface/User/user';

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

  private value: any;

  private declare fileType: SystemFileTypeEnumMetadata;

  private fileName: string = 'New_File';

  private declare permissions: SystemFilePermissionsMetadata;

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
    this.permissions = data.permissions ? data.permissions : { read: SystemUserPermissionsEnumMetadata.User };

    //TODO permissions
  }

  public get_value(): any {
    return this.value;
  }

  public get_file_name(): string {
    return this.fileName;
  }

  public get_icon_path(): string {
    return this.iconPath;
  }

  public get_permissions(): SystemFilePermissionsMetadata {
    return this.permissions;
  }

  public open(): Promise<any> {
    return new Promise(async (resolve) => {
      switch (this.fileType) {
        case SystemFileTypeEnumMetadata.apps:
          let process = this.value() as Process;
          resolve(process.run().Window.open());
          break;
        case SystemFileTypeEnumMetadata.executable:
          let command = this.value as Command;
          resolve(await command.run());
          break;
        default:
          break;
      }
    });
  }
}
