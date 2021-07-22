import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { ItemsDateInit } from './OpenWindowOption';
import { isDate, isOption } from './Type';

//TODO component is not used
export function CloseWindowOptionUnsave(component: ComponentClass): void {
  if (BiosComponent.WindowFastOptionDisplay) {
    BiosComponent.WindowFastOptionDisplay = false;
   // component.MainOption[component.selected].date = ItemsDateInit;

  } else if (BiosComponent.WindowDisplay) {
    BiosComponent.WindowDisplay = false;
  }
}
export function CloseWindowOptionSave(component: ComponentClass): void {
  if (isOption(component.MainOption[component.selected])) {
    component.MainOption[component.selected].selected =
      BiosComponent.WindowSelectedOption;
    BiosComponent.WindowDisplay = false;
  } else if (isDate(component.MainOption[component.selected])) {
    //TODO Save

    BiosComponent.WindowFastOptionDisplay = false;
  } else {
    //TODO else
  }
}
