import { BiosComponent } from 'src/app/bios/bios.component';
import { BootbComponent } from 'src/app/bootb/bootb.component';
import { BiosExit } from './BiosExit';

export function DiscardChanges(): void {
  //TODO Export = BiosComponent.BiosMenuSavePoint

  BiosExit(false);
}

function unSave(): void {}
