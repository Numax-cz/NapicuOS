import {setSettingsValue} from 'src/app/bios/ToolSettings';
import {BiosComponent} from 'src/app/bios/components/bios/bios.component';
import {Boot} from './Boot';

export function DiscardChanges(): void {
  setSettingsValue(BiosComponent.BiosMenuSavePoint);
  Boot();
}
