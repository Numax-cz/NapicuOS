import {WelcomeComponent} from "./welcome.component";
import {
  SystemInstallationOptionsArrayBinds,
  SystemInstallationOptionsArrayMetadata,
  welcomeUserInstallationDataMetadata
} from "../../interface/Apps/Welcome";

export abstract class WelcomeComponentClass<T> {

  public declare bindArrayName: SystemInstallationOptionsArrayBinds;

  public abstract checkSubmit(): boolean;

  public abstract submit(): T | void;

  public next(): void {
    if (this.checkSubmit()) {
      if (this.bindArrayName) {
        let ar = WelcomeComponent.systemInstallationOptions[this.bindArrayName];
        if (ar) {
          let f: T | void = this.submit();
          if (f) ar.data = f;
        } else {
          console.error(`Error: ${this.bindArrayName} not found in WelcomeComponent.systemInstallationOptions`);
        }
      }
      WelcomeComponent.next();
    }
  }

  public back(): void {
    WelcomeComponent.back(); //TODO reset data?
  }
}
