import {Component, OnInit} from '@angular/core';
import {SYSTEM_IMAGES} from "../../../config/System";
import {NapicuOS} from "../../../system.napicuos";
import {NapicuOS_available_language} from "../../../Language/langs";
import {SettingsComponent} from "../settings.component";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public changeLanguage(lang: NapicuOS_available_language): void {
    NapicuOS.set_active_user_language(lang);
    SettingsComponent.update_setting_items();
  }

  get GetCzechFlag(): string{
    return SYSTEM_IMAGES.czechFlag;
  }

  get GetUSAFlag(): string {
    return SYSTEM_IMAGES.usaFlag;
  }

  get GetLanguage(): NapicuOS_available_language{
    return NapicuOS.get_active_user_language();
  }

  get GetSystemLangText(): string{
    return NapicuOS.get_language_words().other.sys_lang;
  }
}
