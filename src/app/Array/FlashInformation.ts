import { FlashInformation } from '../interface/FlashInformation';

export var Current: FlashInformation = {
  board: 'P8H66-CFT3',
  ver: '1606 h:320',
  date: '07/24/2021',
};

export var Update: FlashInformation = {
  board: 'Unknown',
  ver: 'Unknown',
  date: 'Unknown',
};

export var Drive = [
  {
    title: 'A',
    description: '',
    dir: [],
  },
  {
    title: 'C',
    description: 'System Res',
    dir: [
      {
        title: 'Boot',
      },
      {
        title: 'Recovery',
      },
      {
        title: 'System Volume',
      },
    ],
    file: [],
  },
  {
    title: 'D',
    description: 'USB-BIOS',
    dir: [
      {
        title: 'System~1',
      },
    ],
    file: [
      {
        title: 'P8H66-CFT3 - 1701 h:320',
      },
    ],
  },

];
