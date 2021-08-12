import { DatePipe } from '@angular/common';
import { Time, Date } from '../interface/ToolSettings';

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
