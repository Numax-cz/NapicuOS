import { Options, settings, ToolSettings } from './ToolSettings';

export interface ComponentClass {
  selected: number;
  MainOption: ToolSettings;

  isOption(component: settings): boolean;
  isTime(component: settings): boolean;
  isDate(component: settings): boolean;
}
