import { ComponentClass } from '../interface/ComponentClass';
import { settings } from '../interface/ToolSettings';

export function isOption(component: settings, index?: number): boolean {
  if (!index) index = 0;
  if (component.options[index] && component.options[index].title) {
    return true;
  }
  return false;
}

export function isDate(component: settings, index?: number): boolean {
  if (!index) index = 0;
  if (component.options[index] && component.options[index].date) {
    return true;
  }
  return false;
}
