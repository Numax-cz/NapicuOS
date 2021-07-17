import { ChoseSettings } from "./ChoseSettings";
import { Options, settings } from "./ToolSettings";

export interface ComponentClass {
  selected: number;
  MainOption: settings[] | ChoseSettings[];
}