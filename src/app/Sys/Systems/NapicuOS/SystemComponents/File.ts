import {Command} from './Command';
import {Process} from './Process';
import {SystemFileConsMetadata, SystemFileTypeEnumMetadata,} from '../interface/FilesDirs/File';
import {SystemFilePermissionsMetadata} from '../interface/Permissions';
import {Window} from "./Window";
import {copy} from "../../../../Bios/Scripts/DeepClone";
import {AppCreatMetadata} from "../interface/System";
import {TerminalClass} from "./Terminal";
import {SystemUserPermissionsEnumMetadata} from "../config/UserPerms";
import {NapicuOS} from "../system.napicuos";


export class SystemFile {

  //TODO DOC

  /**
   * Default icons directory
   */
  public static readonly defaultIconsPath: string =
    '/assets/systems/NapicuOS/SystemIcons';

  private declare _fileType: SystemFileTypeEnumMetadata;
  private declare _permissions: SystemFilePermissionsMetadata;
  private declare _createdBy: string;

  /**
   * The basic system file
   * @param data File data to create
   */
  constructor(data: SystemFileConsMetadata) {
    this._value = data.value;
    this._fileName = `${data.fileName}`;
    this._fileType = data.fileType;
    this._permissions = data.permissions || {read: SystemUserPermissionsEnumMetadata.User};
    this._iconPath = data.iconPath || `${SystemFile.defaultIconsPath}/XFD/download.svg`,
      this._createdBy = data.createdBy || 'root';
    NapicuOS.cache_image(this._iconPath);
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

  set fileType(value: SystemFileTypeEnumMetadata) {
    this._fileType = value;
  }

  private _fileName: string = 'New_File';

  get fileName(): string {
    return this._fileName;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

//Getters

  set fileName(value: string) {
    this._fileName = value;
  }


  get permissions(): SystemFilePermissionsMetadata {
    return this._permissions;
  }

  set permissions(value: SystemFilePermissionsMetadata) {
    this._permissions = value;
  }

  public open(data?: { params?: string[], terminal?: TerminalClass }): Promise<any> {
    return new Promise(async (resolve) => {
      switch (this._fileType) {
        case SystemFileTypeEnumMetadata.apps:
          let i = this.value() as AppCreatMetadata;
          let p = new Process({
            processTitle: i.processTitle,
            Window: new Window(copy({
              windowTitle: i.appTitle,
              component: i.appComponent,
              windowData: i.windowData,
              resizeAllowed: i.resizeAllowed,
              windowButtons: i.windowButtons,
            })),
            multiRun: i.multiRun
          })
          resolve(p.run()?.Window.open());
          break;
        case SystemFileTypeEnumMetadata.executable:
          let command = this._value as Command;
          resolve(await command.run(data?.params, data?.terminal));
          break;
        case SystemFileTypeEnumMetadata.audio:
          NapicuOS.play_audio(this._value);
          resolve(null);
          break;
        default:
          break;
      }
    });
  }
}
