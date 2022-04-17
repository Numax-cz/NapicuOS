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
      success: false
    }
  };
  protected selectedBarOption: number = 0;


  constructor() {

  }

  ngOnInit(): void {


  }

  get GetKeysSystemInstallationOptions(): string[] {
    return Object.keys(WelcomeComponent.systemInstallationOptions);
  }

  get GetSystemInstallationOptions(): SystemInstallationOptionsMetadata {
    return WelcomeComponent.systemInstallationOptions;
  }

  get GetSelectedBarOption(): number {
    return this.selectedBarOption
  }

  public next(): void {
    if (this.selectedBarOption < this.GetKeysSystemInstallationOptions.length - 1) this.selectedBarOption += 1;
  }

  public back(): void {
    if (this.selectedBarOption > 0) this.selectedBarOption -= 1;
  }
}
