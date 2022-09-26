import {WelcomeComponent} from "./welcome.component";

export abstract class WelcomeComponentClass<T> {


  public abstract checkSubmit(): boolean;

  public abstract submit(): T | void;

  public next(): void {
    if (this.checkSubmit()) {
        let ar = WelcomeComponent.systemInstallationOptions[WelcomeComponent.selectedItem];
        if (ar) {
          let f: T | void = this.submit();
        } else {
          console.error(`Error: Option not found in WelcomeComponent.systemInstallationOptions`);
        }
      WelcomeComponent.next();
    }
  }

  public back(): void {
    WelcomeComponent.back(); //TODO reset data?
  }
}
