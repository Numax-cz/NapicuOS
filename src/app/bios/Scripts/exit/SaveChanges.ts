import {BiosOptionsST, BiosSettings} from 'src/app/bios/ToolSettings';
import {BiosComponent} from 'src/app/bios/components/bios/bios.component';
import {cookiesForBisoSettingsAr} from 'src/app/bios/config/Cookies';
import {setCookies} from '../Cookies';
import {Reboot} from './Reboot';

export function SaveChanges(): void {
  Save();
  Reboot();
}

export function Save(): void {
  BiosComponent.BiosMenuSavePoint = BiosSettings;
  setCookies<BiosOptionsST>(cookiesForBisoSettingsAr, BiosSettings);
}
