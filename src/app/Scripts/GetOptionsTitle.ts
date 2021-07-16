import { ComponentOption } from '../interface/ComponentOption';

export function GetOptionsTitle(component: ComponentOption): string {
  return component.options[component.selected].title;
}
