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
import {SYSTEM_IMAGES} from "../config/System";
import {SystemCommandsPrefixEnum} from "../config/commands/Commands";


export class SystemFile {

  //TODO DOC

  /**
   * Default icons directory
   */
  public static readonly defaultIconsPath: string =
    '/assets/systems/NapicuOS/SystemIcons';

  public declare fileName: string;
  public declare fileType: SystemFileTypeEnumMetadata;
  public declare permissions: SystemFilePermissionsMetadata;
  public declare createdBy: string;
  public declare value: any;
  public declare iconPath: string;
  /**
   * The basic system file
   * @param data File data to create
   */
  constructor(data: SystemFileConsMetadata) {
    this.value = data.value;
    this.fileName = `${data.fileName}`;
    this.fileType = data.fileType;
    this.permissions = data.permissions || {read: SystemUserPermissionsEnumMetadata.User};
    this.iconPath = data.iconPath || SYSTEM_IMAGES.AppDocText,
      this.createdBy = data.createdBy || 'root';
  }

  public async open(data?: { params?: string[], terminal?: TerminalClass }): Promise<any> {

      switch (this.fileType) {
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
          p.run()?.Window.open(data?.params)
          break;
        case SystemFileTypeEnumMetadata.executable:
          let command = this.value as Command;
          return await command.run(data?.params, data?.terminal)

        case SystemFileTypeEnumMetadata.audio:
          NapicuOS.play_audio(this.value);
          break;
        case SystemFileTypeEnumMetadata.document:
          await NapicuOS.run_command({cmd: SystemCommandsPrefixEnum.notePadCommand, args: data?.params || undefined})
          break;
        default:
          break;
      }
  }
}
