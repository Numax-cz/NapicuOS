import {BiosDate, BiosTime} from '../interface/ToolSettings';

/**
 * Index 1 is the `hour`
 *
 * Index 2 is the `minute`
 *
 * Index 3 is the `second`
 * @returns {BiosDate} Date
 */
export function setTime(): BiosTime[] {
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
export function setDate(): BiosDate[] {
  var d = new Date();

  var out: BiosTime[] = [
    {
      title: "1",
    },
    {
      title: "1",
    },
    {
      title: "2020",
    },
  ]

  // var out: BiosTime[] = [
  //   {
  //     title: (d.getMonth() + +1).toString(),
  //   },
  //   {
  //     title: d.getDate().toString(),
  //   },
  //   {
  //     title: d.getFullYear().toString(),
  //   },
  // ];
  return out;
}
