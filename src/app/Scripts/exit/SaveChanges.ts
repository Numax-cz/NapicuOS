import { ArrayToolSettings } from 'src/app/Array/ToolSettings';
import { BiosComponent } from 'src/app/bios/bios.component';
import { getCookies, setCookies } from '../Cookies';
import { BiosExit } from './BiosExit';

export function SaveChanges(): void {
  Save();
  BiosExit();
  console.log('SaveChanges');
}

function Save(): void {
  BiosComponent.BiosMenuSave = ArrayToolSettings;
  setCookies('BiosSettingsArray', JSON.stringify(ArrayToolSettings));
}
