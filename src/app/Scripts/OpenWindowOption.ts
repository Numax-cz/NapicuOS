import { BiosMainComponent } from '../bios-main/bios-main.component';
import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { isTime, isOption, isDate } from './Type';
import { Time, settings } from '../interface/ToolSettings';

export var ItemsDateInit: Time[] ;
export var nevim: any = {};
export function OpenWindowOption(component: ComponentClass): void {
  if (component) {
    if (isOption(component.MainOption[component.selected])) {
      BiosComponent.WindowItems =
        component.MainOption[component.selected].options;
      BiosComponent.WindowDisplay = true;
    } else if (isTime(component.MainOption[component.selected])) {
      ItemsDateInit = component.MainOption[component.selected].time.map((x) =>
        Object.assign({}, x)
      );
      BiosComponent.WindowItems = component.MainOption[component.selected].time;
      BiosComponent.WindowFastOptionDisplay = true;
    } else if (isDate(component.MainOption[component.selected])) {
      ItemsDateInit = component.MainOption[component.selected].date.map((x) =>
        Object.assign({}, x)
      );
      BiosComponent.WindowItems = component.MainOption[component.selected].date
      BiosComponent.WindowFastOptionDisplay = true;
    }
    else {
      BiosMainComponent.errorType();
    }
  }
}
