import { Drives } from '../interface/Directories';
import { FlashInformation } from '../interface/FlashInformation';
import { FlashingTxt } from '../interface/FlashingTxt';

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

export var FlashingText: FlashingTxt = {
  0: 'Checking File:',
  1: 'Erasing BIOS:',
  2: 'Writin BIOS:',
  3: 'Verifying BIOS:',
};

export var Driv = [
  {
    title: 'A',
    description: '',
    Boot: [
      {
        xd: [
          {
            file: 'xd',
            xdxd: [
              {
                title: 'xdxd',
              },
            ],
          },
        ],
      },
    ],
  },
];

export var Drive: Drives[] = [
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
        dir: [
          {
            title: 'xd',
            dir: [
              {
                title: 'xdxd',
                dir: [],
              },
            ],
          },
        ],
      },
      {
        title: 'Recovery',
        dir: [],
      },
      {
        title: 'System Volume',
        dir: [],
      },
      {
        title: '$Windows.~WS',
        dir: [],
      },
      {
        title: '$WinREAgent',
        dir: [],
      },
      {
        title: 'ESD',
        dir: [],
      },
      {
        title: 'PerfLogs',
        dir: [],
      },
      {
        title: 'Program Files',
        dir: [],
      },
      {
        title: 'Program Files(x86)',
        dir: [],
      },
      {
        title: 'ProgramData',
        dir: [],
      },
      {
        title: 'Users',
        dir: [],
      },
      {
        title: 'Windows',
        dir: [],
      },
      {
        title: 'Boot',
        dir: [],
      },
    ],
  },
  {
    title: 'D',
    description: 'USB-BIOS',
    dir: [
      {
        title: 'System~1',
      },
      {
        title: 'P8H66-CFT3 - 1701 h:320',
      },
    ],
  },
];
