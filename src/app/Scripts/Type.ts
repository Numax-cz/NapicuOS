import { ComponentClass } from '../interface/ComponentClass';
import { Options, settings, Time, Date } from '../interface/ToolSettings';

export type WindowItems = Options[] | Time[] | Date[];
/**
 *
 * @param {settings} component - Interface in ToolSettings.ts
 * @returns boolen
 */
export function isOption(component: settings): boolean {
  var index = 0;
  if (component.options[index] && component.options[index].title) {
    return true;
  }
  return false;
}
/**
 *
 * @param {settings} component - Interface in ToolSettings.ts
 * @returns boolen
 */
export function isTime(component: settings): boolean {
  var index = 0;
  if (component.time[index] && component.time[index].title) {
    return true;
  }
  return false;
}
/**
 *
 * @param {settings} component - Interface in ToolSettings.ts
 * @returns boolen
 */
export function isDate(component: settings): boolean {
  var index = 0;
  if (component.date[index] && component.date[index].title) {
    return true;
  }
  return false;
}
/**
 *
 * @param {settings} component - Interface in ToolSettings.ts
 * @returns boolen
 */
export function isOptionsFast(component: settings): boolean {
  if (component.optionsFast) return true;
  return false;
}
