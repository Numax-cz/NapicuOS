import { BiosComponent } from '../bios/bios.component';

export function CloseWindowOptionUnsave(component: any): void {
  if (component) {
    BiosComponent.WindowDisplay = false;
    BiosComponent.WindowItems = [];
  }
}
export function CloseWindowOptionSave(component: any): void {
  if (component) {
    //Todo save Option
    if (component.MainOption[component.selected].options) {
      component.MainOption[component.selected].selected =
        BiosComponent.WindowSelectedOption;
    } else if (component.MainOption[component.selected].onTrue) {
      if (BiosComponent.WindowSelectedOption == 0) {
        component.MainOption[component.selected].onTrue();
      }
    } else {
      console.error('Invalid input Array');
    }
    BiosComponent.WindowSelectedOption = 0;
    BiosComponent.WindowDisplay = false;
    BiosComponent.WindowItems = [];
  }
}
