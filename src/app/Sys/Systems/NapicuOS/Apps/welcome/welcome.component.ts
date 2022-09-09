import {Component, OnInit, Type} from '@angular/core';
import {MainComponent} from "./main/main.component";
import {UserComponent} from "./user/user.component";
import {WelcomeLanguageComponent} from "./language/language.component";
import {User} from "../../SystemComponents/User";
import {WelcomeThemeComponent} from "./theme/theme.component";
import {ThemeComponent} from "../settings/theme/theme.component";
import {welcomeItemsOptionMetadata} from "../../interface/Apps/Welcome";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public static userCache: User | null = null;
  public static selectedItem: number = 0;

  public static systemInstallationOptions: welcomeItemsOptionMetadata[] = [
    {
      name: "Welcome",
      component: MainComponent,
    },
    {
      name: "User",
      component: UserComponent,
    },
    {
      name: "Language",
      component: WelcomeLanguageComponent,
    },
    {
      name: "Theme",
      component: WelcomeThemeComponent,
    }
  ];


  constructor() {

  }

  ngOnInit(): void {


  }

  public static get GetValuessSystemInstallationOptions(): welcomeItemsOptionMetadata{
    return WelcomeComponent.systemInstallationOptions[WelcomeComponent.selectedItem];
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
