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
   * Default application window settings
   */
  public static defaultWindowAppData: windowData = Window.centerPos(40, 40);
  /**
   * Window z-index
   */
  public z_index: number = 1;
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

  public appData: windowData = Window.defaultWindowAppData;
  constructor(component: Type<any>, WindowTitle?: string, windowData?: windowData) {
    this.WindowComponent = component;
    if (WindowTitle) this.WindowTitle = WindowTitle;
    if (windowData) this.appData = windowData;
  }

  public readonly open = (): void => {
    this.display = true;
    WindowComponent.WindowHistory.push(this);
  };

  public readonly close = (): void => {
    this.display = false;
    WindowComponent.WindowHistory.slice(WindowComponent.WindowHistory.indexOf(this, 0), 1);
  };
  /**
   * Returns centered application window settings
   * @param width Window width
   * @param height Window height
   */
  public static centerPos(width: number, height: number): windowData {
    return {
      width: width,
      height: height,
      posX: 50 - Math.round(width / 2),
      posY: 50 - Math.round(height / 2),
    };
  }
  //* * * *  Getters * * *
  //? Getters State
  /**
   * Returns if the application window state is maximized
   */
  public isStateMaximized(): boolean {
    return this.state == 'maximized' ? true : false;
  }
  /**
   * Returns if the application window state is left
   */
  public isStateLeft(): boolean {
    return this.state == 'left' ? true : false;
  }
  /**
   * Returns if the application window state is right
   */
  public isStateRight(): boolean {
    return this.state == 'right' ? true : false;
  }
  /**
   * Returns if the application window state is normal
   */
  public isStateNormal(): boolean {
    return this.state == 'normal' ? true : false;
  }
  /**
   * Returns if the application window state is top-left
   */
  public isStateTopLeft(): boolean {
    return this.state == 'top-left' ? true : false;
  }
  /**
   * Returns if the application window state is top-right
   */
  public isStateTopRight(): boolean {
    return this.state == 'top-right' ? true : false;
  }

  //? Getters Pos
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
  //* * * *  Setters * * *
  //
  //? Window State
  /**
   * Sets the application window state to maximized
   */
  public setStateMaximized(): void {
    this.state = 'maximized';
  }
  /**
   * Sets the application window state to left
   */
  public setStateLeft(): void {
    this.state = 'left';
  }
  /**
   * Sets the application window state to right
   */
  public setStateRight(): void {
    this.state = 'right';
  }
  /**
   * Sets the application window state to normal
   */
  public setStateNormal(): void {
    this.state = 'normal';
  }
  /**
   * Sets the application window state to top-left
   */
  public setStateTopLeft(): void {
    this.state = 'top-left';
  }
  /**
   * Sets the application window state to top-right
   */
  public setStateTopRight(): void {
    this.state = 'top-right';
  }
  /**
   * Sets the exact image in the icon directory
   * @param path Path to the icon
   */
  public setIcon(path: string): void {}

  //? Window Pos
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

  //? WindowTitle
  public setWindowTitle(title: string): void {
    this.WindowTitle = title;
  }
}
