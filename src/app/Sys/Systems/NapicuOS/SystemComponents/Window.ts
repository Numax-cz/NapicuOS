import {Type} from '@angular/core';
import {windowButtonsMetadata, windowData, windowState,} from '../interface/Window/WindowData';
import {percentage, percentageValue,} from '../scripts/getPercentage';
import {WindowComponent} from '../template/window/window.component';
import {SystemWindowConstructorMetadata} from "../interface/Window/Window";
import {NapicuOS} from "../system.napicuos";
import {NapicuOS_available_language} from "../Language/langs";
import {AppCreatTitleMetadata} from "../interface/System";

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
   * Specifies whether the application window can be resized
   */
  public declare resizeAllowed: boolean;
  /**
   * Title of the application window
   */
  protected windowTitle: AppCreatTitleMetadata = {en: 'Window', cs: "Window"};
  /**
   * Specifies whether the application window is displayed
   */
  public declare display: boolean;
  /**
   * Main component of the application window
   */
  public declare windowComponent: Type<any>;
  /**
   * Determines whether the application window is selected by the user
   */
  public declare activated: boolean;
  /**
   *  Specifies the state of the application window
   */
  public state: windowState = 'normal';
  /**
   * Application window settings
   */
  public declare windowData: windowData;
  /**
   * Setting which buttons to display on the application window
   */
  public declare windowButtons: windowButtonsMetadata;

  public static windowOperation: boolean;

  public declare executeArguments: string[];

  constructor(data: SystemWindowConstructorMetadata) {
    this.windowComponent = data.component;
    if (data.windowTitle) this.windowTitle = data.windowTitle;
    this.windowData = data.windowData
    this.windowButtons = data.windowButtons || {
      minimized: true,
      maximize: true,
      close: true,
    };
    this.resizeAllowed = data.resizeAllowed || data.resizeAllowed === undefined;
  }

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

  /**
   * Opens the application window
   */
  public open(args?: string[]): void {
    this.display = true;
    if (WindowComponent.WindowHistory.length) {
      WindowComponent.WindowHistory[WindowComponent.WindowHistory.length - 1].activated = false;
    }
    WindowComponent.WindowHistory.push(this);
    this.z_index = WindowComponent.WindowHistory.length - 1;
    this.activated = true;
    WindowComponent.selectedWindow = this;
    this.executeArguments = args || [];
    NapicuOS.onRunNewApp();
  };

  /**
   * Closes the application window
   */
  public close(): void {
    this.display = false;
    WindowComponent.WindowHistory.slice(
      WindowComponent.WindowHistory.indexOf(this, 0),
      1
    );
  };



  /**
   * Function that executes when the window process is killed
   */
  public onKillProcess(): void { }


  //* * * *  Getters * * *

  //? Getters State
  /**
   * Returns if the application window state is maximized
   */
  public isStateMaximized(): boolean {
    return this.state == 'maximized';
  }

  /**
   * Returns if the application window state is left
   */
  public isStateLeft(): boolean {
    return this.state == 'left';
  }

  /**
   * Returns if the application window state is right
   */
  public isStateRight(): boolean {
    return this.state == 'right';
  }

  /**
   * Returns if the application window state is normal
   */
  public isStateNormal(): boolean {
    return this.state == 'normal';
  }

  /**
   * Returns if the application window state is top-left
   */
  public isStateTopLeft(): boolean {
    return this.state == 'top-left';
  }

  /**
   * Returns if the application window state is top-right
   */
  public isStateTopRight(): boolean {
    return this.state == 'top-right';
  }

  //? Getters Pos
  /**
   * Returns top in pixels
   * @returns {number} value in pixels
   */
  public getTop(): number {
    return percentageValue(this.windowData.posY, window.innerHeight);
  }

  /**
   * Returns left in pixels
   * @returns {number} value in pixels
   */
  public getLeft(): number {
    return percentageValue(this.windowData.posX, window.innerWidth);
  }

  /**
   * Returns width in pixels
   * @returns {number} value in pixels
   */
  public getWidth(): number {
    return percentageValue(this.windowData.width, window.innerWidth);
  }

  /**
   * Returns height in pixels
   * @returns {number} value in pixels
   */
  public getHeight(): number {
    return percentageValue(this.windowData.height, window.innerHeight);
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
  public setIcon(path: string): void {
  }

  //? Window Pos
  /**
   * Sets the top in percentage
   * @param {number} valuePX - In pixels
   */
  public setTop(valuePX: number): void {
    this.windowData.posY = percentage(valuePX, window.innerHeight);
  }

  /**
   *Sets the left in percentage
   * @param {number} valuePX - In pixels
   */
  public setLeft(valuePX: number): void {
    this.windowData.posX = percentage(valuePX, window.innerWidth);
  }

  /**
   *Sets the width in percentage
   * @param {number} valuePX - In pixels
   */
  public setWidth(valuePX: number): void {
    this.windowData.width = percentage(valuePX, window.innerWidth);
  }

  /**
   *Sets the height in percentage
   * @param {number} valuePX - In pixels
   */
  public setHeight(valuePX: number): void {
    this.windowData.height = percentage(valuePX, window.innerHeight);
  }

  //? WindowTitle
  public setWindowTitle(title: string): void {
   this.windowTitle = title;
  }

  public getWindowTitle(): string{
    return (typeof this.windowTitle != "string" ) ? this.windowTitle[NapicuOS.get_active_user_language()] : this.windowTitle;
  }
}
