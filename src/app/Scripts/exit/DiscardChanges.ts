import { Continue } from './Reboot';

export function DiscardChanges(): void {
  //TODO Export = BiosComponent.BiosMenuSavePoint

  Continue();
}

function unSave(): void {}
