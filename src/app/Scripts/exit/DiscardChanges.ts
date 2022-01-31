import {setSettingsValue} from 'src/app/Array/ToolSettings';
import {BiosComponent} from 'src/app/Bios/bios/bios.component';
import {Boot} from './Boot';

export function DiscardChanges(): void {
  setSettingsValue(BiosComponent.BiosMenuSavePoint);
  Boot();
}


