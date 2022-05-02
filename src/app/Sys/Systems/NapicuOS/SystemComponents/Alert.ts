import {Type} from '@angular/core';
import {AlertComponent} from '../Apps/alert/alert.component';
import {systemAlertImagesEnumMetadata} from '../config/Alert';
import {windowData} from '../interface/Window/WindowData';
import {Window} from './Window';
import {copy} from "../../../../Bios/Scripts/DeepClone";

export class SystemAlert extends Window {
  public static defaultSize: windowData = {
    width: null,
    height: null,
    posX: 50,
    posY: 50,
  };
  public static defaultComponent: Type<any> = AlertComponent;

  constructor(
    public title: string,
    public value: string,
    public type: systemAlertImagesEnumMetadata
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
  }
}
