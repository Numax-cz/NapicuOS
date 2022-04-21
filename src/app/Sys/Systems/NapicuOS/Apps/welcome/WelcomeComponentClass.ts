import {WelcomeComponent} from "./welcome.component";

export abstract class WelcomeComponentClass<T> {
  public abstract data: T;
  public successData: boolean = false;

  public abstract checkSubmit(): boolean;

  public next(): void {
    if (this.checkSubmit()) WelcomeComponent.next(); //TODO IF successData
  }

  public back(): void {
    WelcomeComponent.back(); //TODO reset data?
  }
}
