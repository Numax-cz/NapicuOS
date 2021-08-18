import { BiosComponent } from 'src/app/bios/bios.component';
import { BiosExit } from './BiosExit';

export function DiscardChanges(): void {
  //TODO Export = BiosComponent.BiosMenuSavePoint
  BiosExit();
}

function unSave(): void {}
