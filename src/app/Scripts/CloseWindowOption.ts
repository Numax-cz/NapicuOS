import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { ItemsDateInit } from './OpenWindowOption';
import { clearTimeInterval, setTimeInterval } from './TimeController';
import { isTime, isOption, isDate } from './Type';
//TODO clear code
export function CloseWindowOptionUnsave(component: ComponentClass): void {
  if (BiosComponent.WindowFastOptionDisplay) {
    if (isTime(component.MainOption[component.selected])) {
      component.MainOption[component.selected].time = ItemsDateInit;
      setTimeInterval(component.MainOption, component.selected);
    } else if (isDate(component.MainOption[component.selected])) {
      component.MainOption[component.selected].date = ItemsDateInit;
    }
  }
  close();
}
export function CloseWindowOptionSave(component: ComponentClass): void {
  if (isOption(component.MainOption[component.selected])) {
    component.MainOption[component.selected].selected =
      BiosComponent.WindowSelectedOption;
  } else if (isTime(component.MainOption[component.selected])) {
    setTimeInterval(component.MainOption, component.selected);
  }
  close();
}

function close() {
  BiosComponent.WindowDisplay = false;
  BiosComponent.WindowFastOptionDisplay = false;
}
