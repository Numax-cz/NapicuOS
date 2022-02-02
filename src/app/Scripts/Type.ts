import { Date, Options, settings, Time } from '../interface/ToolSettings';

export type WindowItems = Options[] | Time[] | Date[];

/**
 *
 * @param {settings} component - Interface in ToolSettings.ts
 * @returns boolen
 */
export function isOption(component: settings): boolean {
  var index = 0;
  if (
    component &&
    component.options &&
    component.options[index] &&
    component.options[index].title
  ) {
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
  if (
    component &&
    component.time &&
    component.time[index] &&
    component.time[index].title
  ) {
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
  if (
    component &&
    component.date &&
    component.date[index] &&
    component.date[index].title
  ) {
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
  if (component && component.optionsFast) return true;
  return false;
}
