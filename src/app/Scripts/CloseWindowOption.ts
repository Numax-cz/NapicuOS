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
    if (component.MainOption[component.selected].selected) {
      component.MainOption[component.selected].selected =
        BiosComponent.WindowSelectedOption;
    } else if (!component.MainOption[component.selected].onTrue) {
      
    } else {
      console.error("Není nastavena ")
    }

   
    BiosComponent.WindowSelectedOption = 0;
    BiosComponent.WindowDisplay = false;
    BiosComponent.WindowItems = [];
  }
}
