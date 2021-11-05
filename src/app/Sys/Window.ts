import { Type } from '@angular/core';
import { Process } from './Process';

interface data {
  posX: number;
  posY: number;
  width: number;
  height: number;
}

export class Window {
  public WindowTitle: string = 'Window';
  public declare display: boolean;
  public declare WindowComponent: Type<any>;
  public appData: data = {
    posX: 30,
    posY: 30,
    width: 700,
    height: 400,
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
  //? Getters
  public getTop(): number {
    return this.appData.posY;
  }
  public getLeft(): number {
    return this.appData.posX;
  }
  public getWidth(): number {
    return this.appData.width;
  }
  public getHeight(): number {
    return this.appData.height;
  }
  //? Setters
  public setTop(value: number): void {
    this.appData.posY = value;
  }
  public setLeft(value: number): void {
    this.appData.posX = value;
  }
  public setWidth(value: number): void {
    this.appData.width = value;
  }
  public setHeight(value: number): void {
    this.appData.height = value;
  }
}
