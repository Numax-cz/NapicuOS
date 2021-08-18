import { BiosSettings } from 'src/app/Array/ToolSettings';
import { BiosComponent } from 'src/app/bios/bios.component';
import { BootComponent } from 'src/app/boot/boot.component';
import { setCookies } from '../Cookies';
import { BiosExit } from './BiosExit';

export function SaveChanges(): void {
  Save();
  BootComponent.BlackScreen = true;
  BiosExit();
}

function Save(): void {
  BiosComponent.BiosMenuSavePoint = BiosSettings;
  setCookies('BiosSettingsArray', JSON.stringify(BiosSettings));
}
