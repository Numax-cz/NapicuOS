import { BiosComponent } from "../Bios/bios/bios.component";

/**
 * Redirects to the required path
 * @param Path - URL Path
 */
export function Navigate(Path: string) {
  BiosComponent.BiosRouter.navigate([Path]); //TODO { skipLocationChange: true }
}

