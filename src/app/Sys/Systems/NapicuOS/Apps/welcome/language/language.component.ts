import { Component, OnInit } from '@angular/core';
import {NapicuOS_available_language} from "../../../Language/langs";
import {NapicuOS} from "../../../system.napicuos";
import {SettingsComponent} from "../../settings/settings.component";
import {SYSTEM_IMAGES} from "../../../config/System";
import {WelcomeComponent} from "../welcome.component";
import {WelcomeComponentClass} from "../WelcomeComponentClass";
import {welcomeUserInstallationDataMetadata} from "../../../interface/Apps/Welcome";

@Component({
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class WelcomeLanguageComponent extends WelcomeComponentClass<welcomeUserInstallationDataMetadata>  implements OnInit {
  public static declare selectedLang: NapicuOS_available_language;

  constructor() {
    super();
  }

  ngOnInit(): void {
    WelcomeLanguageComponent.selectedLang = NapicuOS.get_active_user_language();
  }

  public changeLanguage(lang: NapicuOS_available_language): void {
    let usr_cache = WelcomeComponent.userCache;
    if(usr_cache){
      usr_cache.userSetting.lang
    }
    //Set
    WelcomeLanguageComponent.selectedLang = lang;
    NapicuOS.set_active_user_language(lang); //for root
    //Update
    SettingsComponent.update_setting_items();
  }

  get GetCzechFlag(): string{
    return SYSTEM_IMAGES.czechFlag;
  }

  get GetUSAFlag(): string {
    return SYSTEM_IMAGES.usaFlag;
  }

  get GetLanguage(): NapicuOS_available_language{
    return WelcomeLanguageComponent.selectedLang;
  }

  checkSubmit(): boolean {
    return true;
  }

  submit(): void | welcomeUserInstallationDataMetadata {
    return undefined;
  }

  get GetNextButtonText(): string{
    return NapicuOS.get_language_words().other.next;
  }

  get GetBackButtonText(): string{
    return NapicuOS.get_language_words().other.back;
  }

  get GetSystemLanguageText(): string{
    return NapicuOS.get_language_words().other.system_language;
  }

}
