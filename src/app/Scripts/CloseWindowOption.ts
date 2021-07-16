import { BiosComponent } from '../bios/bios.component';

export function CloseWindowOptionUnsave(component: any): void {
  if (component) {
    BiosComponent.WindowDisplay = false;
  }
}
export function CloseWindowOptionSave(component: any): void {
  if (component) {
    //Todo save Option
    
    BiosComponent.WindowDisplay = false;
  }
}
