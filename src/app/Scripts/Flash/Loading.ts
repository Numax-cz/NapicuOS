import { FlashComponent } from 'src/app/Bios/flash/flash.component';
import { LoadingFlashComponent } from 'src/app/Config/Animation/Flash';

export function Loading(): void {
  setTimeout(() => {
    FlashComponent.Loading = true;
  }, LoadingFlashComponent);
}
