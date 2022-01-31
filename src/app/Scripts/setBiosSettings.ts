import {BiosOptionsST, BiosSettings, setSettingsValue} from '../Array/ToolSettings';
import {BiosComponent} from '../Bios/bios/bios.component';
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
  var SaveBiosArray: BiosOptionsST = copy(BiosSettings);
  if (JSON.parse(getCookies(cookiesForBisoSettingsAr))) {
    BiosComponent.BiosMenuSavePoint = JSON.parse(getCookies(cookiesForBisoSettingsAr));
    setSettingsValue(BiosComponent.BiosMenuSavePoint);
  } else {
    BiosComponent.BiosMenuSavePoint = SaveBiosArray;
  }
}
