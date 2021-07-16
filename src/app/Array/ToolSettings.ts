import { ComponentOption } from '../interface/ComponentOption';
import { ToolSettings } from '../interface/ToolSettings';

export var Main: ToolSettings = {
  title: 'System Overview',
  settings: [
    {
      title: 'System Language',
      options: [
        {
          title: 'English',
          // selected: true,
        },
        {
          title: 'Korea',
          //selected: false,
        },
        {
          title: 'Slovakia',
          // selected: false,
        },
        {
          title: 'Deutschland',
          //selected: false,
        },
      ],
      selected: 0,
      id: 0,
    },
    {
      title: 'System Date',
      options: [
        {
          title: '{}',
          //selected: true,
        },
      ],
      selected: 0,
      id: 1,
    },
  ],
};
