import { English, LangMenu } from '../Config/Lang/English';
import { cookiesForBisoSettingsAr, getCookies } from './Cookies';

export function getLanguage(): any {
  var pack;
  var selected = JSON.parse(getCookies(cookiesForBisoSettingsAr));
  var selectedLang: number = selected.Main.settings[0].selected || 0;
  switch (LangMenu[selectedLang].title) {
    default:
      pack = English;
  }
  return pack;
}
