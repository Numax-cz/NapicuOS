import { BiosComponent } from '../bios/bios.component';
import { Date } from '../interface/ToolSettings';

export function TimeSet(keyCode: number, Items: Date[]) {
  var ItemsNumber: number = Number(
    Items[BiosComponent.WindowSelectedOption].title
  );

  if (keyCode == 38) ItemsNumber += +1;
  if (keyCode == 40) ItemsNumber -= +1;

  Items[BiosComponent.WindowSelectedOption].title = ItemsNumber.toString();
}
