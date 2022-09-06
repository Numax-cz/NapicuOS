import {FileComponent} from "../../Apps/file/file.component";
import {Window} from "../Window";
import {ProcessResolver} from "../ProcessResolver";
import {AppCreatMetadata} from "../../interface/System";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {NapicuApp} from "../../scripts/Decorators";

import {SystemApp} from "../SystemApp";
import {FileManagerResponse} from "../../interface/Apps/Response/FileManagerRes";
import {lang_App_File_Title} from "../../Language/SystemApp";


@NapicuApp({
    appTitle: lang_App_File_Title,
    processTitle: SystemAppsProcessName.fileManager,
    appComponent: FileComponent,
    windowData: Window.centerPos(75, 75),
    resizeAllowed: true,
    fileIconPath: SYSTEM_IMAGES.BlueFolder,
    addToDock: true,
})
export class SystemAppsFileManager extends SystemApp implements ProcessResolver<FileManagerResponse> {
  public static declare appData: AppCreatMetadata;

  constructor(
    public processResolver?: (value: (PromiseLike<FileManagerResponse> | FileManagerResponse)) => void,
  ) {
    super(SystemAppsFileManager.appData);
  }

  override processResolve(data: any) {
    this.processResolver?.(data);
  }
}

