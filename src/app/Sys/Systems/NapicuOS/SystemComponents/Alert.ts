import {Type} from '@angular/core';
import {AlertComponent} from '../Apps/alert/alert.component';
import {systemAlertImagesEnumMetadata} from '../config/Alert';
import {windowData} from '../interface/Window/WindowData';
import {Window} from './Window';
import {copy} from "../../../../Bios/Scripts/DeepClone";
import {AlertData} from "../interface/Alert";
import {WindowData} from "../interface/WindowData";

export class SystemAlert extends Window implements WindowData<AlertData> {
  public static defaultSize: windowData = {
    width: null,
    height: null,
    posX: 50,
    posY: 50,
  };
  public static defaultComponent: Type<any> = AlertComponent;

  public declare data: AlertData;

  constructor(
    title: string,
    value: string,
    type: systemAlertImagesEnumMetadata
  ) {
    super({
      component: SystemAlert.defaultComponent,
      windowTitle: title,
      windowData: copy(SystemAlert.defaultSize),
      resizeAllowed: false,
      windowButtons: {
        close: true,
        maximize: false,
        minimized: false,
      },
    });
    this.data = {
      title: title,
      value: value,
      type: type,
    };
  }
}
