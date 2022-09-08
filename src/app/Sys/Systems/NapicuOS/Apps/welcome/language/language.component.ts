import { Component, OnInit } from '@angular/core';
import {NapicuOS_available_language} from "../../../Language/langs";
import {NapicuOS} from "../../../system.napicuos";
import {SettingsComponent} from "../../settings/settings.component";
import {SYSTEM_IMAGES} from "../../../config/System";
import {WelcomeComponent} from "../welcome.component";

@Component({
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class WelcomeLanguageComponent implements OnInit {
  public static declare selectedLang: NapicuOS_available_language;

  constructor() { }

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

}
