import { SelectorContext } from '@angular/compiler';
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
      description: 'Nastavení',
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
      description: 'Nastavení',

      selected: 0,
    },
    {
      title: 'System Date',
      options: [],
      time: [],
      date: setTime(),
      description: 'Nastavení',
      selected: 0,
    },
  ],
};

export var Boot: ToolSettings = {
  title: '',
  settings: [
    {
      title: 'Boot Mode',
      options: [
        {
          title: 'UEFI',
        },
        {
          title: 'Legacy',
        },
      ],
      time: [],
      date: [],
      description: 'Nastavení',

      selected: 0,
    },
    {
      title: 'Secure Boot',
      options: [
        {
          title: 'Enabled',
        },
        {
          title: 'Disabled',
        },
      ],
      time: [],
      date: [],
      description: 'Nastavení',
      selected: 0,
    },
    {
      title: 'Boot priority order',
      options: [
        {
          title: '1. Samsung 860 EVO M.2 1TB',
        },
        {
          title: '2. IBM 1405 0.0075 GB',
        },
        {
          title: '3. Seagate ST-225 0.021 GB',
        },
      ],
      time: [],
      date: [],
      description: 'Nastavení',
      selected: 0,
    },
  ],
};
