import {setSettingsValue} from 'src/app/Bios/ToolSettings';
import {BiosComponent} from 'src/app/Bios/components/bios/bios.component';
import {Boot} from './Boot';

export function DiscardChanges(): void {
  setSettingsValue(BiosComponent.BiosMenuSavePoint);
  Boot();
}
