import {BiosOptionsST, BiosSettings} from 'src/app/Array/ToolSettings';
import {BiosComponent} from 'src/app/Bios/bios/bios.component';
import {cookiesForBisoSettingsAr} from 'src/app/Config/Cookies';
import {setCookies} from '../Cookies';
import {Reboot} from './Reboot';

export function SaveChanges(): void {
  Save();
  Reboot();
}

function Save(): void {
  BiosComponent.BiosMenuSavePoint = BiosSettings;
  setCookies<BiosOptionsST>(cookiesForBisoSettingsAr, BiosSettings);
}
