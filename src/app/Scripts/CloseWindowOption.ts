import { BiosComponent } from '../bios/bios.component';

export function CloseWindowOptionUnsave(component: any): void {
  if (component) {
    BiosComponent.WindowDisplay = false;
  }
}
export function CloseWindowOptionSave(component: any): void {
  if (component) {
    //Todo save Option
    component.MainOption[component.selected].selected = BiosComponent.WindowSelectedOption;
    BiosComponent.WindowSelectedOption = 0;
    BiosComponent.WindowDisplay = false;
  }
}
