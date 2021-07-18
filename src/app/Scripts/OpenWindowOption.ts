import { BiosComponent } from '../bios/bios.component';

export function OpenWindowOption(component: any): void {
  if (component) {
    if (component.MainOption[component.selected].options) {
      BiosComponent.WindowItems =
        component.MainOption[component.selected].options;
        BiosComponent.WindowDisplay = true;
    } 
  }
}
