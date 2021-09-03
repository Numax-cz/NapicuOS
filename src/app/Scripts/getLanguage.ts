import { cookiesForBisoSettingsAr } from '../Config/Cookies';
import { Deutschland, English, Korea, LangMenu, Slovakia } from '../Config/Lang/Lang';
import { getCookies } from './Cookies';

export function getLanguage(): any {
  var pack;
  var selected = JSON.parse(getCookies(cookiesForBisoSettingsAr)) || 0;

  switch (LangMenu[selected].title) {
    case 'Korea':
      pack = Korea;
      break;
    case 'Slovakia':
      pack = Slovakia;
      break;
    case 'Deutschland':
      pack = Deutschland;
      break;
    default:
      pack = English;
  }
  return pack;
}
