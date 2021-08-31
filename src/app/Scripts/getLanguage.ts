import { English, Korea, LangMenu } from '../Config/Lang/English';
import { cookiesForBisoSettingsAr, getCookies } from './Cookies';

export function getLanguage(): any {
  var pack;
  var selected = JSON.parse(getCookies(cookiesForBisoSettingsAr));
  var selectedLang: number = selected.Main.settings[0].selected || 0;
  switch (LangMenu[selectedLang].title) {
    case 'Korea':
      pack = Korea;
      break;

    default:
      pack = English;
  }
  return pack;
}
