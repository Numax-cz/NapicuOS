import { ToolSettings } from '../interface/ToolSettings';

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
      selected: 0,
    },
    {
      title: 'System Date',
      options: [
        {
          date: {
            hours: '10',
            minutes: '20',
            seconds: '30',
          },
        },
      ],
      selected: 0,
    },
  ],
};
