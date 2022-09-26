import {Type} from '@angular/core';
import {windowData} from '../interface/Window/WindowData';
import {Window} from './Window';
import {copy} from "../../../../bios/Scripts/DeepClone";
import {AlertInputComponent} from "../Apps/alert-input/alert-input.component";
import {WindowData} from "../interface/WindowData";
import {InputAlertData} from "../interface/InputAlert";

import {InputButtonTypeMetadata} from "../interface/InputButtonType";
import {NapicuOS} from "../system.napicuos";


export class SystemInputAlert extends Window implements WindowData<InputAlertData> {
  public static defaultSize: windowData = {
    width: null,
    height: null,
    posX: 50,
    posY: 50,
  };
  public static defaultComponent: Type<any> = AlertInputComponent;

  public declare data: InputAlertData;

  constructor(
    title: string,
    value: string,
    icon: string | undefined,
    buttonType: InputButtonTypeMetadata | undefined,
    public resolve: (value: (PromiseLike<string | null> | string | null)) => void,
  ) {
    super({
      component: SystemInputAlert.defaultComponent,
      windowTitle: title,
      windowData: copy(SystemInputAlert.defaultSize),
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
      icon: icon,
      inputData: null,
      buttonType: buttonType || NapicuOS.get_button_type_creat_cancel()
    };

  }

  public submit(value: string): void {
    this.resolve(value);
  }

  public reject(): void {
    this.resolve(null);
  }

  public override onKillProcess(): void {
   this.resolve(null);
  }
}
