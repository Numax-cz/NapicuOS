import { BiosComponent } from "../bios/bios.component";
//TODO document
export function Navigate(Path: string) {
  BiosComponent.BiosRouter.navigate([Path]);
}

