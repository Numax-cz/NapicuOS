import {WindowData} from "../../interface/WindowData";
import {InputAlertData} from "../../interface/InputAlert";
import {windowData} from "../../interface/Window/WindowData";
import {AlertInputComponent} from "../../Apps/alert-input/alert-input.component";
import {Type} from "@angular/core";
import {SystemInputAlert} from "../AlertInput";
import {FileComponent} from "../../Apps/file/file.component";
import {Window} from "../Window";
import {Process} from "../Process";
import {ProcessResolver} from "../ProcessResolver";
import {AppCreatMetadata} from "../../interface/System";
import {SYSTEM_IMAGES} from "../../config/System";
import {SystemAppsProcessName} from "../../config/Apps/AppsNames";
import {NapicuApp} from "../../scripts/Decorators";
import {NapicuApps} from "../../systemAppsNew";
import {NapicuOS} from "../../system.napicuos";



@NapicuApp({
    appTitle: 'File',
    processTitle: SystemAppsProcessName.fileManager,
    appComponent: FileComponent,
    windowData: Window.centerPos(75, 75),
    resizeAllowed: true,
    fileIconPath: SYSTEM_IMAGES.BlueFolder,
    addToDock: true,
})
export class SystemAppsFileManager extends Process implements ProcessResolver<string> {
  public static declare appData: AppCreatMetadata;

  constructor(
    public processResolver?: (value: (PromiseLike<string> | string)) => void,
  ) {
    super(NapicuOS.creat_installation_cnt(SystemAppsFileManager.appData));
  }

  override processResolve(data: any) {
    this.processResolver?.(data);
  }


}

