import {Type} from '@angular/core';
import {AlertComponent} from '../Apps/alert/alert.component';
import {systemAlertTypeEnumMetadata} from '../interface/Alert';
import {windowData} from '../interface/Window/windowData';
import {Window} from './Window';

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
    public type: systemAlertTypeEnumMetadata
  ) {
    super({
      component: SystemAlert.defaultComponent,
      windowTitle: title,
      windowData: SystemAlert.defaultSize,
      resizeAllowed: false,
      windowButtons: {
        close: true,
        maximize: false,
        minimized: false,
      },
    });
  }
}
