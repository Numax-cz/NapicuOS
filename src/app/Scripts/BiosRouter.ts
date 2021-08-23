import { BiosComponent } from '../bios/bios.component';
//TODO document
//TODO Doc
export function Navigate(Path: string) {
  BiosComponent.BiosRouter.navigate([Path]); //TODO NONLIST
}

// , { skipLocationChange: true }
