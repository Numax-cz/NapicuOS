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
      date: [],
      selected: 0,
    },
    {
      title: 'System Date',
      options: [],
      date: [
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
      selected: 0,
    },
  ],
};
