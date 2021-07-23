import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { ItemsDateInit } from './OpenWindowOption';
import { isTime, isOption, isDate } from './Type';

//TODO component is not used
export function CloseWindowOptionUnsave(component: ComponentClass): void {
  if (BiosComponent.WindowFastOptionDisplay) {
    if (isTime(component.MainOption[component.selected])) {
      component.MainOption[component.selected].time = ItemsDateInit;
    } else if (isDate(component.MainOption[component.selected])) {
      component.MainOption[component.selected].date = ItemsDateInit;
    }

    BiosComponent.WindowFastOptionDisplay = false;
  } else if (BiosComponent.WindowDisplay) {
    BiosComponent.WindowDisplay = false;
  }
}
export function CloseWindowOptionSave(component: ComponentClass): void {
  if (isOption(component.MainOption[component.selected])) {
    component.MainOption[component.selected].selected =
      BiosComponent.WindowSelectedOption;
    BiosComponent.WindowDisplay = false;
  } else if (
    isTime(component.MainOption[component.selected]) ||
    isDate(component.MainOption[component.selected])
  ) {
    BiosComponent.WindowFastOptionDisplay = false;
  } else {
    //TODO else
  }
}
