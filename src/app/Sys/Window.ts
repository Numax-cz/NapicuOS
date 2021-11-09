import { Type } from '@angular/core';
import { Process } from './Process';
import { percentage, percentageValue } from './Systems/NapicuOS/scripts/getPercentage';

interface data {
  posX: number;
  posY: number;
  width: number;
  height: number;
}

export class Window {
  public WindowTitle: string = 'Window';
  public declare display: boolean;
  public maximized: boolean = false;
  public declare WindowComponent: Type<any>;
  public appData: data = {
    posX: 30,
    posY: 30,
    width: 40,
    height: 40,
  };
  constructor(component: Type<any>) {
    this.WindowComponent = component;
  }

  public readonly open = (): void => {
    this.display = true;
  };

  public readonly close = (): void => {
    this.display = false;
  };

  public readonly maximize = (): void => {
    this.maximized = true;
  };

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
