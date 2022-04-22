import {AfterViewInit, Component, OnInit, TemplateRef, Type, ViewChild} from '@angular/core';
import {MainComponent} from "./main/main.component";
import {UserComponent} from "./user/user.component";
import {
  SystemInstallationOptionsArrayBinds,
  SystemInstallationOptionsArrayMetadata,
  SystemInstallationOptionsMetadata
} from "../../interface/Apps/welcome";
import {NapicuOSComponent} from "../../components/napicu-os/napicu-os.component";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  public static systemInstallationOptions: SystemInstallationOptionsArrayMetadata = {
    Welcome: {
      component: MainComponent,
      data: null
    },

    User: {
      component: UserComponent,
      data: null
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

  public static get GetSystemInstallationOptions(): SystemInstallationOptionsArrayMetadata {
    return WelcomeComponent.systemInstallationOptions;
  }

  get GetDisplayedComponent(): Type<any> {
    return WelcomeComponent.systemInstallationOptions[this.GetKeysSystemInstallationOptionsKeys[this.GetSelectedBarOption]].component;
  }

  get GetKeysSystemInstallationOptionsKeys(): Array<SystemInstallationOptionsArrayBinds> {
    return WelcomeComponent.GetKeysSystemInstallationOptions as Array<SystemInstallationOptionsArrayBinds>;
  }


  get GetSelectedBarOption(): number {
    return WelcomeComponent.GetSelectedBarOption;
  }

  public static next(): void {
    if (WelcomeComponent.selectedBarOption < this.GetKeysSystemInstallationOptions.length - 1) this.selectedBarOption += 1;
    console.log(WelcomeComponent.systemInstallationOptions);
  }

  public static back(): void {
    if (WelcomeComponent.selectedBarOption > 0) this.selectedBarOption -= 1;
  }
}
