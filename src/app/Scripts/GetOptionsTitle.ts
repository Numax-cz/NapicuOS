import { settings } from '../interface/ToolSettings';

export function GetOptionsTitle(component: settings): string {
  if (component.options) {
    return component.options[component.selected].title;
  } else {
    return component.advanced[component.selected].title;
  }
}
