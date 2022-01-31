import {Type} from '@angular/core';
import {AlertComponent} from './Systems/NapicuOS/Apps/alert/alert.component';
import {systemAlertTypeEnumMetadata} from './Systems/NapicuOS/interface/Alert/alert';
import {windowData} from './Systems/NapicuOS/interface/Window/windowData';
import {Window} from './Window';

export class SystemAlert extends Window {
  public static defaultSize: windowData = Window.centerPos(15, 15);
  public static defaultComponent: Type<any> = AlertComponent;

  constructor(public title: string, public value: string, public type: systemAlertTypeEnumMetadata) {
    super(SystemAlert.defaultComponent, title, SystemAlert.defaultSize, false);
  }
}
