import { BiosComponent } from '../bios/bios.component';


export function OpenMenuOption(component: any): void {
  if (component) {
    BiosComponent.WindowItems =
      component.MainOption[component.selected].options;
    BiosComponent.WindowDisplay = true;
  }
}
