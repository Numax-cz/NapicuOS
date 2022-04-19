import {WelcomeComponent} from "./welcome.component";

export abstract class WelcomeComponentClass<T> {
  public abstract data: T;
  public successData: boolean = false;

  public next(): void {
    WelcomeComponent.next(); //TODO IF successData
  }

  public back(): void {
    WelcomeComponent.back();
  }
}
