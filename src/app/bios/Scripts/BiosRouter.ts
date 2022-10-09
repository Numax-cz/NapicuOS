import {BootComponent} from '../components/boot/boot.component';

/**
 * Redirects to the required path
 * @param Path - URL Path
 */
export function Navigate(Path: string) {
  BootComponent.NavigateRouter.navigate([Path], { skipLocationChange: false });
}
