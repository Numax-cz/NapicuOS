import { DatePipe } from '@angular/common';
import { Time, Date } from '../interface/ToolSettings';

/**
 * Index 1 is the `hour`
 *
 * Index 2 is the `minute`
 *
 * Index 3 is the `second`
 * @returns {Date} Date
 */
export function setTime(): Time[] {
  return [
    {
      title: '0',
    },
    {
      title: '0',
    },
    {
      title: '0',
    },
  ];
}

/**
 * Index 1 is the `month`
 *
 * Index 2 is the `Date`
 *
 * Index 3 is the `year`
 * @returns {Date} Date
 */
export function setDate(): Date[] {
  var d = new Date();
  var out: Time[] = [
    {
      title: (d.getMonth() + +1).toString(),
    },
    {
      title: d.getDate().toString(),
    },
    {
      title: d.getFullYear().toString(),
    },
  ];
  return out;
}
