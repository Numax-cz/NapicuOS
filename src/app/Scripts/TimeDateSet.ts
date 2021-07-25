import { BiosComponent } from '../bios/bios.component';
import { ComponentClass } from '../interface/ComponentClass';
import { Time } from '../interface/ToolSettings';
import { ItemsDateInit } from './OpenWindowOption';
import { isDate, isTime } from './Type';

export function TimeDateSet(
  keyCode: number,
  Items: Time[],
  component: ComponentClass
) {
  //TODO AutoCheck - Date


  

  var ItemsNumber: number = Number(
    Items[BiosComponent.WindowSelectedOption].title
  );
  var componentSelected = component.MainOption[component.selected];
  if (keyCode == 38) ItemsNumber += +1;
  if (keyCode == 40) ItemsNumber -= +1;

  //! TODO
  if (isTime(componentSelected)) {
    if (BiosComponent.WindowSelectedOption == 0) {
      MaxMinNumber(24);
    } else {
      MaxMinNumber(60);
    }
  } else if (isDate(componentSelected)) {
    var month: number = Number(
      component.MainOption[component.selected].date[0].title
    );
    if (BiosComponent.WindowSelectedOption == 0) {
      //* Month
      MaxMinNumber(13, 1);
    } else if (BiosComponent.WindowSelectedOption == 1) {
      //* Day
      var maxDays: number = 0;
      switch (month) {
        case 1:
          maxDays = 31;
          break;
        case 2:
          maxDays = 29; //TODO Fix - Přestupný rok
          break;
        case 3:
          maxDays = 31;
          break;
        case 4:
          maxDays = 30;
          break;
        case 5:
          maxDays = 31;
          break;
        case 6:
          maxDays = 30;
          break;
        case 7:
          maxDays = 31;
          break;
        case 8:
          maxDays = 31;
          break;
        case 9:
          maxDays = 30;
          break;
        case 10:
          maxDays = 31;
          break;
        case 11:
          maxDays = 30;
          break;
        case 12:
          maxDays = 31;
          break;
        default:
          break;
      }
      MaxMinNumber(maxDays, 1);
    } else if (BiosComponent.WindowSelectedOption == 2) {
      //* Year
      MaxMinNumber(3000, 2000);
    }
  }

  Items[BiosComponent.WindowSelectedOption].title = ItemsNumber.toString();
  function MaxMinNumber(max: number, min?: number) {
    if (!min) min = 0;
    max -= 1;
    if (ItemsNumber > max) {
      ItemsNumber = min;
    }
    if (ItemsNumber < min) {
      ItemsNumber = max;
    }
  }
}

