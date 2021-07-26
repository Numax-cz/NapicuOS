import { Options, settings } from './ToolSettings';

export interface ComponentClass {
  selected: number;
  MainOption: settings[];

  isOption(component: settings, index: number): boolean;
  isTime(component: settings): boolean;
  isDate(component: settings): boolean;
}
//todo do píče to dát 