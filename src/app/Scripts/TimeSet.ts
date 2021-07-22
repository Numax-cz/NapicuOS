import { BiosComponent } from '../bios/bios.component';
import { Date } from '../interface/ToolSettings';

export function TimeSet(keyCode: number, Items: Date[]) {
  var ItemsNumber: number = Number(
    Items[BiosComponent.WindowSelectedOption].title
  );

  if (keyCode == 38) ItemsNumber += +1;
  if (keyCode == 40) ItemsNumber -= +1;

  if (BiosComponent.WindowSelectedOption == 0) {
    MaxNumber(24);
  } else {
    MaxNumber(60);
  }

  Items[BiosComponent.WindowSelectedOption].title = ItemsNumber.toString();
  function MaxNumber(max: number) {
    if (ItemsNumber == max) {
      ItemsNumber = 0;
    }
  }
}
