import { JsonPipe } from '@angular/common';
import { BiosOptionsST, lang } from '../Array/ToolSettings';
import { NoBootDevice } from '../Config/BlackScreenText';
import { cookiesForBisoSettingsAr } from '../Config/Cookies';
import { getCookies } from './Cookies';
import { setDisplayText } from './Stage/text';

//TODO boolean
export function checkBootSector(): void {
    let cookies: BiosOptionsST = JSON.parse(getCookies(cookiesForBisoSettingsAr));
    console.log(cookies);
    
  if (!cookies) return;

  if (cookies.Boot.settings[3].title == 'lang.Boot.boot_priority_titlekj') {
  } else {
    setDisplayText([`NapicuBiosError  => the string does not match the index`]);
  }
  //   setDisplayText(NoBootDevice);
}

export function Load(): void {}
