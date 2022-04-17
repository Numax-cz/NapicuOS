import {BiosOptionsST, BiosSettings, setSettingsValue,} from '../ToolSettings';
import {BiosComponent} from '../components/bios/bios.component';
import {cookiesForBisoSettingsAr} from '../Config/Cookies';
import {getCookies} from './Cookies';
import {copy} from './DeepClone';

/**
 * Sets bios settings according to cookies, or sets default bios settings
 */
export function setBiosSettingsFromCookies(): void {
  /**
   * Default Bios settings
   */
  let SaveBiosArray: BiosOptionsST = copy(BiosSettings);
  if (getCookies<any>(cookiesForBisoSettingsAr)) {
    BiosComponent.BiosMenuSavePoint = getCookies<any>(cookiesForBisoSettingsAr)
    setSettingsValue(BiosComponent.BiosMenuSavePoint);
  } else {
    BiosComponent.BiosMenuSavePoint = SaveBiosArray;
  }
}
