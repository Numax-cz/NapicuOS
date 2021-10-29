import { Type } from '@angular/core';

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
  constructor(component: Type<any>) {}

  public readonly open = (): void  => {};

  public readonly close = (): void  => {};
}
