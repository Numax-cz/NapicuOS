import {FlashComponent} from 'src/app/bios/components/flash/flash.component';
import {In, Out} from 'src/app/bios/Config/Animation/Flash';
import {Loading} from '../LoadingAnimations';

export function FlashBios(): void {
  FlashComponent.ezFlashWindow = true;
  Loading('flash', Out, In);
}
