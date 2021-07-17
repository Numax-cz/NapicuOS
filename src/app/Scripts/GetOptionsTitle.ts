import { settings } from "../interface/ToolSettings";


export function GetOptionsTitle(component: settings): string {
  return component.options[component.selected].title;
}
