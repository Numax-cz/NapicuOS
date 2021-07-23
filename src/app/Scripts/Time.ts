import { DatePipe } from '@angular/common';
import { Time, Date } from '../interface/ToolSettings';

export function setTime(): Time[] {
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
