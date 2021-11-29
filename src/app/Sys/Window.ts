import { Type } from '@angular/core';
import { GrubComponent } from '../System/grub/grub.component';
import { Process } from './Process';
import { System } from './System';
import { windowData, windowState } from './Systems/NapicuOS/interface/Window/windowData';
import { percentage, percentageValue } from './Systems/NapicuOS/scripts/getPercentage';
import { NapicuOS } from './Systems/NapicuOS/system.napicuos';
import { WindowComponent } from './Systems/NapicuOS/template/window/window.component';

export class Window {
  /**
   * Title of the application window
   */
  public WindowTitle: string = 'Window';
  /**
   * Specifies whether the application window is displayed
   */
  public declare display: boolean;
  /**
   * Main component of the application window
   */
  public declare WindowComponent: Type<any>;
  /**
   * Determines whether the application window is selected by the user
   */
  public declare activated: boolean;
  /**
   *  Specifies the state of the application window
   */
  public state: windowState = 'normal';

  public appData: windowData = {
    posX: 30,
    posY: 30,
    width: 40,
    height: 40,
    z_index: 1,
  };
  constructor(component: Type<any>) {
    this.WindowComponent = component;
  }

  public readonly open = (): void => {
    this.display = true;
    WindowComponent.WindowHistory.push(this);
  };

  public readonly close = (): void => {
    this.display = false;
   // WindowComponent.WindowHistory.slice(WindowComponent.WindowHistory.indexOf(this, 0), 1);
  };

  public isStateMaximized(): boolean {
    return this.state == 'maximized' ? true : false;
  }
  public isStateLeft(): boolean {
    return this.state == 'left' ? true : false;
  }
  public isStateRight(): boolean {
    return this.state == 'right' ? true : false;
  }
  public isStateNormal(): boolean {
    return this.state == 'normal' ? true : false;
  }

  //? Getters
  /**
   * Returns top in pixels
   * @returns {number} value in pixels
   */
  public getTop(): number {
    return percentageValue(this.appData.posY, window.innerHeight);
  }
  /**
   * Returns left in pixels
   * @returns {number} value in pixels
   */
  public getLeft(): number {
    return percentageValue(this.appData.posX, window.innerWidth);
  }
  /**
   * Returns width in pixels
   * @returns {number} value in pixels
   */
  public getWidth(): number {
    return percentageValue(this.appData.width, window.innerWidth);
  }
  /**
   * Returns height in pixels
   * @returns {number} value in pixels
   */
  public getHeight(): number {
    return percentageValue(this.appData.height, window.innerHeight);
  }

  //? Setters
  /**
   * Sets the top in percentage
   * @param {number} valuePX - In pixels
   */
  public setTop(valuePX: number): void {
    this.appData.posY = percentage(valuePX, window.innerHeight);
  }
  /**
   *Sets the left in percentage
   * @param {number} valuePX - In pixels
   */
  public setLeft(valuePX: number): void {
    this.appData.posX = percentage(valuePX, window.innerWidth);
  }
  /**
   *Sets the width in percentage
   * @param {number} valuePX - In pixels
   */
  public setWidth(valuePX: number): void {
    this.appData.width = percentage(valuePX, window.innerWidth);
  }
  /**
   *Sets the height in percentage
   * @param {number} valuePX - In pixels
   */
  public setHeight(valuePX: number): void {
    this.appData.height = percentage(valuePX, window.innerHeight);
  }
}
