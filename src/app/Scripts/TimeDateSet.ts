import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { Time } from '../interface/ToolSettings';
import { isDate, isTime } from './Type';

export function TimeDateSet(
  keyCode: number,
  Items: Time[],
  component: ComponentClass
) {
  var ItemsNumber: number = Number(
    Items[BiosComponent.WindowSelectedOption].title
  );
  var componentSelected = component.MainOption[component.selected];
  if (keyCode == 38) ItemsNumber += +1;
  if (keyCode == 40) ItemsNumber -= +1;
  console.log(Items);

  if (isTime(componentSelected)) {
    if (BiosComponent.WindowSelectedOption == 0) {
      MaxNumber(24);
    } else {
      MaxNumber(60);
    }
  } else if (isDate(componentSelected)) {
  }

  Items[BiosComponent.WindowSelectedOption].title = ItemsNumber.toString();
  function MaxNumber(max: number) {
    if (ItemsNumber == max) {
      ItemsNumber = 0;
    }
    if (ItemsNumber < 0) {
      ItemsNumber = 0;
    }
  }
}
