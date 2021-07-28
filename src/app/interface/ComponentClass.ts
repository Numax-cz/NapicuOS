import { Options, settings, ToolSettings } from './ToolSettings';

export interface ComponentClass {
  selected: number;
  MainOption: ToolSettings;

  isOption(component: settings, index: number): boolean;
  isTime(component: settings): boolean;
  isDate(component: settings): boolean;
}
//todo do píče to dát 