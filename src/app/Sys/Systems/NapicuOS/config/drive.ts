import {systemDrivesMetadata} from '../interface/FilesDirs/systemDir';

export const napicu_os_root_part = 'Computer';

export const NapicuOSSystemDir: systemDrivesMetadata = {
  Computer: {
    dir: {
      //RootDir
      home: {
        dir: {
          Desktop: {},
          Documents: {},
          Downloads: {},
          Music: {},
          Pictures: {},
          Videos: {},
        },
      },
      usr: {
        files: [],
      },
      bin: {
        files: [],
      },
    },
  },
};
