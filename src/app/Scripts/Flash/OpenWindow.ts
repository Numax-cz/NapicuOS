import { BiosComponent } from 'src/app/bios/bios.component';

export function OptionAlert() {}

export function ErrorAlert() {
  BiosComponent.WindowItems = [{ title: 'Ok' }];
  //BiosComponent.WindowError = true;
  BiosComponent.WindowDisplay = true;
}
