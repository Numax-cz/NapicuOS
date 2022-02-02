import { BiosOptionsST } from '../Array/ToolSettings';
import { cookiesForBisoSettingsAr } from '../Config/Cookies';
import {
  Deutschland,
  English,
  Japanes,
  LangMenu,
  Slovenia,
} from '../Config/Lang/Lang';
import { getCookies } from './Cookies';

export function getLanguage(): any {
  var pack;
  //! Fix
  var cookiesArray: BiosOptionsST = JSON.parse(
    getCookies(cookiesForBisoSettingsAr)
  );
  var selected =
    (cookiesArray && cookiesArray.Main.settings.lang.selected) || 0;

  switch (LangMenu[selected].title) {
    case 'Japanes':
      pack = Japanes;
      break;
    case 'Slovenia':
      pack = Slovenia;
      break;
    case 'Deutschland':
      pack = Deutschland;
      break;
    default:
      pack = English;
  }
  return pack;
}
