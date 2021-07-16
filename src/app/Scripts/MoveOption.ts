import { BiosSettings } from '../interface/BiosSettings';

export function MoveOption(component: BiosSettings, keyCode: number): void {
  // ArrowDown
  if (!component.MainOption) return;
  if (keyCode == 40 && component.selected < component.MainOption.length - 1) {
    component.selected += 1;
  }
  //ArrowUp
  if (keyCode == 38 && component.selected > 0) {
    component.selected -= 1;
  }
}
