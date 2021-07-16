import { BiosComponent } from '../bios/bios.component';


export function OpenWindowOption(component: any): void {
  if (component) {
    BiosComponent.WindowItems =
      component.MainOption[component.selected].options;
    BiosComponent.WindowDisplay = true;
  }
}
