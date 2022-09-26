import {systemDrivesMetadata} from '../interface/FilesDirs/SystemDir';

export const NAPICU_OS_ROOT_PART = 'System';

export const NapicuOSSystemDir: systemDrivesMetadata = {
  System: {
    dir: {
      //RootDir
      home: {
        dir: {},
      },
      bin: {
        files: [],
      },
      usr: {
        files: [],
        dir: {
          sounds: {
            files: [],
          },
          images: {
            files: []
          }
        }
      }
    },
  },
};


// Desktop: {},
// Documents: {},
// Downloads: {},
// Music: {},
// Pictures: {},
// Videos: {},
