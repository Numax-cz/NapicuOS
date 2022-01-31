import {BiosComponent} from '../Bios/bios/bios.component';
import {Time} from '../interface/ToolSettings';
import {SettingsTemplateComponent} from '../Bios/settings-template/settings-template.component';
import {isDate, isTime} from './Type';

export const maxMinutes: number = 60;
export const maxSeconds: number = 60;
export const maxHours: number = 24;

/**
 *
 * @param {number} keyCode
 * @param {Time} Items - Time[]
 */
export function TimeDateSet(keyCode: number, Items: Time[]): void {
  //TODO AutoCheck - Date
  var ItemsNumber: number = Number(Items[BiosComponent.WindowSelectedOption].title);
  var MainOption = Object.values(SettingsTemplateComponent.MainOption);
  var componentSelected = MainOption[SettingsTemplateComponent.selected];
  if (keyCode == 38) ItemsNumber += +1;
  if (keyCode == 40) ItemsNumber -= +1;

  if (isTime(componentSelected)) {
    if (BiosComponent.WindowSelectedOption == 0) {
      MaxMinNumber(maxHours);
    } else {
      MaxMinNumber(maxSeconds); //* Seconds & Minutes
    }
  } else if (isDate(componentSelected)) {
    var date = MainOption[SettingsTemplateComponent.selected].date;
    if (!date) return;
    var month: number = Number(date[0].title);
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

  /**
   * If the number is higher than max, the number will be min.
   *
   * If the number is smaller, the number will be max...
   * @param {number} max - Maximum number
   * @param {number} min - Minimum number, default is 0
   */
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
