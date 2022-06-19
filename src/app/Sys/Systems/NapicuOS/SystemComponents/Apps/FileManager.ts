import {FileComponent} from "../../Apps/file/file.component";
import {Window} from "../Window";
import {ProcessResolver} from "../ProcessResolver";
import {AppCreatMetadata} from "../../interface/System";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {NapicuApp} from "../../scripts/Decorators";

import {SystemApp} from "../SystemApp";


@NapicuApp({
    appTitle: 'File',
    processTitle: SystemAppsProcessName.fileManager,
    appComponent: FileComponent,
    windowData: Window.centerPos(75, 75),
    resizeAllowed: true,
    fileIconPath: SYSTEM_IMAGES.BlueFolder,
    addToDock: true,
})
export class SystemAppsFileManager extends SystemApp implements ProcessResolver<string> {
  public static declare appData: AppCreatMetadata;

  constructor(
    public processResolver?: (value: (PromiseLike<string> | string)) => void,
  ) {
    super(SystemAppsFileManager.appData);
  }

  override processResolve(data: any) {
    this.processResolver?.(data);
  }
}

