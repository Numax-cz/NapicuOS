import {ElementRef} from "@angular/core";

export class Loader{
  protected intervalID: any = null;

  protected width: number = 0;

  constructor(
    protected time: number,
    protected element: ElementRef,
    protected callBack: ()  => void,
    protected maxLoadPercentage: number = 100,

  ) { }

  public start(): void {
    this.setElementWidth(this.width);
    this.intervalID = setInterval(this.frame, this.time);
  }

  public clear(): void {
    this.setElementWidth(0);
    this.intervalID = null;
  }

  protected frame = (): void => {
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      setTimeout(() => {
        this.move();
      }, this.time * 8);
    } else if (randomNumber < 0.7) {
      setTimeout(() => {
        this.move();
      }, this.time * 11);
    } else this.move();
  }

  protected move = (): void =>{
    if (this.width >= this.maxLoadPercentage) {
      clearInterval(this.intervalID);
      if(!this.intervalID) return;
      else this.intervalID = null;
      this.callBack();
    } else {
      this.width++;
      this.setElementWidth(this.width);
    }
  }

  protected setElementWidth(width: number): void {
    this.element.nativeElement.style.width = width + "%"
  }
}
