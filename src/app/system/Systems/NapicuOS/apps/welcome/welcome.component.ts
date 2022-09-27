import {Component, OnInit, Type} from '@angular/core';
import {MainComponent} from "./main/main.component";
import {UserComponent} from "./user/user.component";
import {WelcomeLanguageComponent} from "./language/language.component";
import {User} from "../../SystemComponents/User";
import {WelcomeThemeComponent} from "./theme/theme.component";
import {welcomeItemsOptionMetadata} from "../../interface/Apps/Welcome";
import {InstallComponent} from "./install/install.component";
import {NapicuOS} from "../../system.napicuos";
import {FinishComponent} from "./finish/finish.component";
import {SystemProcessRebootTimeout} from "../../SystemComponents/Process/RebootTimeout";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public static userCache: User | null = null;

  public static selectedItem: number = 0;

  public static systemInstallationOptions: welcomeItemsOptionMetadata[] = [];

  protected static getSystemInstallationOptions(): welcomeItemsOptionMetadata[] {
    return [
      {
        name: NapicuOS.get_language_words().other.welcome,
        component: MainComponent,
      },
      {
        name: NapicuOS.get_language_words().other.user,
        component: UserComponent,
      },
      {
        name: NapicuOS.get_language_words().other.language,
        component: WelcomeLanguageComponent,
      },
      {
        name: NapicuOS.get_language_words().other.theme,
        component: WelcomeThemeComponent,
      },
      {
        name: NapicuOS.get_language_words().other.install,
        component: InstallComponent,
      },
      {
        name: NapicuOS.get_language_words().other.finish,
        component: FinishComponent,
      }
    ]
  }

  public static creatUser(): void {
    if (this.userCache) NapicuOS.add_user(this.userCache);
  }

  public static verifyInstallation(): void {
    NapicuOS.SystemCookiesConfig.firstRun = false;
    if(this.userCache?.username) NapicuOS.add_waiting_function(() => {
      if(WelcomeComponent.userCache?.username) NapicuOS.SystemCookiesConfig.user.activeUser = WelcomeComponent.userCache.username
    });
    NapicuOS.update_config_to_cookies();
  }

  public static restartDevice(): void {
    new SystemProcessRebootTimeout(0).process.run();
  }

  public static updateSystemInstallationOptions(): void {
    this.systemInstallationOptions = this.getSystemInstallationOptions();
  }

  constructor() { }

  ngOnInit(): void {
    WelcomeComponent.userCache = null;
    WelcomeComponent.updateSystemInstallationOptions();
  }

  public get GetValuessSystemInstallationOptionsVal(): welcomeItemsOptionMetadata[]{
    return WelcomeComponent.systemInstallationOptions;
  }

  public get GetDisplayedComponent(): Type<any>{
    return WelcomeComponent.systemInstallationOptions[WelcomeComponent.selectedItem].component;
  }

  public static get GetSelectedBarOption(): number {
    return WelcomeComponent.selectedItem;
  }

  get GetSelectedBarOption(): number {
    return WelcomeComponent.GetSelectedBarOption;
  }

  public static next(): void {
    if (WelcomeComponent.selectedItem < this.systemInstallationOptions.length - 1) this.selectedItem++;
  }

  public static back(): void {
    if (WelcomeComponent.selectedItem > 0) this.selectedItem--;
  }
}
