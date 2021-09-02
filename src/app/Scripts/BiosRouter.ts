
//TODO document

import { BiosComponent } from "../Bios/bios/bios.component";

//TODO Doc
export function Navigate(Path: string) {
  BiosComponent.BiosRouter.navigate([Path]); //TODO NONLIST
}

// , { skipLocationChange: true }
