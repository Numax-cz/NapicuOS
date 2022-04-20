import {AfterViewInit, Component, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {MainComponent} from "./main/main.component";
import {UserComponent} from "./user/user.component";
import {SystemInstallationOptionsMetadata} from "../../interface/Apps/welcome";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  public static systemInstallationOptions: SystemInstallationOptionsMetadata = {
    Welcome: {
      component: MainComponent,
      success: false
    },
    User: {
      component: UserComponent,
      success: false,
      data: {
        username: null
      }
    }
  };
  protected static selectedBarOption: number = 0;


  constructor() {

  }

  ngOnInit(): void {


  }


  public static get GetKeysSystemInstallationOptions(): string[] {
    return Object.keys(WelcomeComponent.systemInstallationOptions);
  }

  public static get GetSelectedBarOption(): number {
    return WelcomeComponent.selectedBarOption;
  }

  public static get GetSystemInstallationOptions(): SystemInstallationOptionsMetadata {
    return WelcomeComponent.systemInstallationOptions;
  }


  get GetKeysSystemInstallationOptions(): string[] {
    return WelcomeComponent.GetKeysSystemInstallationOptions;
  }

  get GetSystemInstallationOptions(): SystemInstallationOptionsMetadata {
    return WelcomeComponent.GetSystemInstallationOptions
  }

  get GetSelectedBarOption(): number {
    return WelcomeComponent.GetSelectedBarOption;
  }

  public static next(): void {
    console.log(WelcomeComponent.systemInstallationOptions[this.GetKeysSystemInstallationOptions[this.selectedBarOption]].data);
    if (WelcomeComponent.selectedBarOption < this.GetKeysSystemInstallationOptions.length - 1) this.selectedBarOption += 1;
  }

  public static back(): void {
    if (WelcomeComponent.selectedBarOption > 0) this.selectedBarOption -= 1;
  }
}
