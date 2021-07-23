import { ToolSettings } from '../interface/ToolSettings';
import { setTime } from '../Scripts/Time';

export var Main: ToolSettings = {
  title: 'System Overview',
  settings: [
    {
      title: 'System Language',
      options: [
        {
          title: 'English',
        },
        {
          title: 'Korea',
        },
        {
          title: 'Slovakia',
        },
        {
          title: 'Deutschland',
        },
      ],
      time: [],
      date: [],
      selected: 0,
    },
    {
      title: 'System Time',
      options: [],
      time: [
        {
          title: '10',
        },
        {
          title: '20',
        },
        {
          title: '30',
        },
      ],
      date: [],
      selected: 0,
    },
    {
      title: 'System Date',
      options: [],
      time: [],
      date: setTime(),
      selected: 0,
    },
  ],
};
