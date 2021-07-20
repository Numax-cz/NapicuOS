import { settings } from '../interface/ToolSettings';
//todo do píče to dát 
export function GetOptionsTitle(component: settings): string | null | undefined {
  if (
    component.options[component.selected] &&
    component.options[component.selected].title
  ) {
    return component.options[component.selected].title;
  } 
  return null;

}
export function GetOptionsTime(component: settings): Object | null{
  
  if (component.options[0] && component.options[0].date) {
    return component.options[0].date;
  } 
  return null;
}

