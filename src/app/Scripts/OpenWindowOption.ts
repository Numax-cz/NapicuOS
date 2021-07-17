import { BiosComponent } from '../bios/bios.component';
import { OptionPanelComponent } from '../option-panel/option-panel.component';
export function OpenWindowOption(component: any): void {
  if (!component.MainOption) return;

  if (component.MainOption[component.selected].options) {
    BiosComponent.WindowItems =
      component.MainOption[component.selected].options;
    OptionPanelComponent.MainTitle = '';
  } else if (component.MainOption[component.selected].onTrue) {
    BiosComponent.WindowItems = [
      {
        title: 'Yes',
        settings: [],
      },
      {
        title: 'No',
        settings: [],
      },
    ];
    OptionPanelComponent.MainTitle =
      component.MainOption[component.selected].title + " ?";
  } else {
    console.error('Invalid input Array');
  }
  BiosComponent.WindowDisplay = true;
}
