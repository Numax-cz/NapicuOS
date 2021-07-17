import { BiosComponent } from '../bios/bios.component';
export function OpenWindowOption(component: any): void {
  if (!component.MainOption) return;

  if (component.MainOption[component.selected].options) {
    BiosComponent.WindowItems =
      component.MainOption[component.selected].options;
  } else if (component.MainOption[component.selected].onTrue) {
    BiosComponent.WindowItems = [
      {
        title: 'Yes',
        settings: [],
      },
      {
        title: 'No',
        settings: [],
      },
    ];
  } else {
    console.error('Invalid input Array');
  }
  BiosComponent.WindowDisplay = true;
}
