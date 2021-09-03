import { BiosSettings } from 'src/app/Array/ToolSettings';
import { BiosComponent } from 'src/app/Bios/bios/bios.component';
import { BootComponent } from 'src/app/Bios/boot/boot.component';
import { cookiesForBisoSettingsAr } from 'src/app/Config/Cookies';
import { setCookies } from '../Cookies';
import { Reboot } from './Reboot';

export function SaveChanges(): void {
  Save();
  //BootComponent.BlackScreen = true;
  Reboot();
}

function Save(): void {
  BiosComponent.BiosMenuSavePoint = BiosSettings;
  setCookies(cookiesForBisoSettingsAr, JSON.stringify(BiosSettings));
}