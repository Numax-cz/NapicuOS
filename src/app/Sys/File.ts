import {Command} from './command';
import {Process} from './Process';
import {SystemFileConsMetadata, SystemFileTypeEnumMetadata,} from './Systems/NapicuOS/interface/FilesDirs/file';
import {SystemFilePermissionsMetadata} from './Systems/NapicuOS/interface/permissions';
import {SystemUserPermissionsEnumMetadata} from './Systems/NapicuOS/interface/User/user';
import {Window} from "./Window";
import {copy} from "../Scripts/DeepClone";
import {AppCreatMetadata} from "./Systems/NapicuOS/interface/system";

export class SystemFile {
  //TODO DOC

  /**
   * Default icons directory
   */
  public static readonly defaultIconsPath: string =
    '/assets/systems/NapicuOS/SystemIcons';

  /**
   * The basic system file
   * @param data File data to create
   */
  constructor(data: SystemFileConsMetadata) {
    this._value = data.value;
    this._fileName = data.fileName;
    this._fileType = data.fileType;
    this._permissions = data.permissions || {read: SystemUserPermissionsEnumMetadata.User};
    this._iconPath = data.iconPath || `${SystemFile.defaultIconsPath}/XFD/download.svg`
  }

  /**
   * Path to the icon (svg)
   */
  private declare _iconPath: string;

  get iconPath(): string {
    return this._iconPath;
  }

  //Setters
  set iconPath(value: string) {
    this._iconPath = value;
  }

  private _value: any;

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
  }

  private declare _fileType: SystemFileTypeEnumMetadata;

  set fileType(value: SystemFileTypeEnumMetadata) {
    this._fileType = value;
  }

  private _fileName: string = 'New_File';

  get fileName(): string {
    return this._fileName;
  }

//Getters

  set fileName(value: string) {
    this._fileName = value;
  }

  private declare _permissions: SystemFilePermissionsMetadata;

  get permissions(): SystemFilePermissionsMetadata {
    return this._permissions;
  }

  set permissions(value: SystemFilePermissionsMetadata) {
    this._permissions = value;
  }

  public open(data?: { params?: string[] }): Promise<any> {
    return new Promise(async (resolve) => {
      switch (this._fileType) {
        case SystemFileTypeEnumMetadata.apps:
          let i = this.value() as AppCreatMetadata;
          let p = new Process({
            processTitle: i.processTitle, Window: new Window(copy({
              windowTitle: i.appTitle,
              component: i.appComponent,
              windowData: i.windowData,
              resizeAllowed: i.resizeAllowed,
              windowButtons: i.windowButtons
            }))
          })
          resolve(p.run().Window.open());
          break;
        case SystemFileTypeEnumMetadata.executable:
          let command = this._value as Command;
          resolve(await command.run(data?.params));
          break;
        default:
          break;
      }
    });
  }
}
