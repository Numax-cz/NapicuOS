import { BiosMainComponent } from '../bios-main/bios-main.component';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { isDate, isOption } from './Type';

export function OpenWindowOption(component: ComponentClass): void {
  if (component) {
    if (isOption(component.MainOption[component.selected])) {
      BiosComponent.WindowItems =
        component.MainOption[component.selected].options;
      BiosComponent.WindowDisplay = true;
    }
    else if (isDate(component.MainOption[component.selected])) {
 
      BiosComponent.WindowFastOptionDisplay = true;      
    } else {
      BiosMainComponent.errorType();
    }
  }
}
