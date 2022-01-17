import { systemDrivesMetadata } from '../interface/FilesDirs/systemDir';
import { napicu_os_dir_home, napicu_os_dir_bin, napicu_os_dir_usr } from './directories';

export const NapicuOSSystemDir: systemDrivesMetadata[] = [
  {
    drives: 'Computer',
    directories: [
      {
        name: napicu_os_dir_home,
        dir: [
          {
            name: 'Desktop',
          },
          {
            name: 'Documents',
          },
          {
            name: 'Downloads',
          },
          {
            name: 'Music',
          },
          {
            name: 'Pictures',
          },
          {
            name: 'Desktop',
          },
          {
            name: 'Videos',
          },
        ],
      },
      {
        name: napicu_os_dir_usr,
        dir: [
          {
            name: 'bin',
          },
        ],
      },
      {
        name: napicu_os_dir_bin,
        dir: [],
      },
    ],
  },
];
