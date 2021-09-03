import { Drives } from '../interface/Directories';
import { FlashInformation } from '../interface/FlashInformation';
import { FlashingTxt } from '../interface/FlashingTxt';
/**
 * Current bios information
 */
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

var newBios: FlashInformation = {
  board: Current.board,
  ver: '1707 h:320',
  date: '8/25/2021',
};

export function WriteInformations(): void {
  Update = newBios;
}

export function WriteInformationsDefault(): void {
  Update.board = 'Unknown';
  Update.ver = 'Unknown';
  Update.date = 'Unknown';
}

export function setNewBiosinf(): void {
  Current = newBios;
}

export var FlashingText: FlashingTxt = {
  0: 'Checking File:',
  1: 'Erasing BIOS:',
  2: 'Writin BIOS:',
  3: 'Verifying BIOS:',
};

export var Drive: Drives[] = [
  {
    title: 'A',
    description: '',
    dir: [
      {
        title: 'Games',
        dir: [
          {
            title: 'Steam',
            dir: [
              { title: 'bin', noEnter: true },
              { title: 'client', noEnter: true },
              { title: 'music', noEnter: true },
              { title: 'userdata', noEnter: true },
              { title: 'steamapps', noEnter: true },
              { title: 'Steam.exe' },
              { title: 'Steam.dll' },
              { title: 'api-ms-win-core-console-l1-1-0.dll' },
              { title: 'api-ms-win-core-console-l1-2-0.dll' },
              { title: 'api-ms-win-core-datetime-l1-1-0.dll' },
              { title: 'api-ms-win-core-debug-l1-1-0.dll' },
              { title: 'api-ms-win-core-errorhandling-l1-1-0.dll' },
              { title: 'api-ms-win-core-file-l1-1-0.dll' },
              { title: 'api-ms-win-core-file-l1-2-0.dll' },
              { title: 'api-ms-win-core-file-l2-1-0.dll' },
              { title: 'api-ms-win-core-handle-l1-1-0.dll' },
              { title: 'api-ms-win-core-heap-l1-1-0.dll' },
              { title: 'api-ms-win-core-interlocked-l1-1-0.dll' },
              { title: 'api-ms-win-core-libraryloader-l1-1-0.dll' },
              { title: 'api-ms-win-core-localization-l1-2-0.dll' },
              { title: 'api-ms-win-core-memory-l1-1-0.dll' },
              { title: 'api-ms-win-core-namedpipe-l1-1-0.dll' },
              { title: 'api-ms-win-core-processenvironment-l1-1-0.dll' },
              { title: 'api-ms-win-core-processthreads-l1-1-0.dll' },
              { title: 'api-ms-win-core-processthreads-l1-1-1.dll' },
              { title: 'api-ms-win-core-profile-l1-1-0.dll' },
              { title: 'api-ms-win-core-rtlsupport-l1-1-0.dll' },
              { title: 'api-ms-win-core-string-l1-1-0.dll' },
              { title: 'api-ms-win-core-synch-l1-1-0.dll' },
              { title: 'api-ms-win-core-synch-l1-2-0.dll' },
              { title: 'api-ms-win-core-sysinfo-l1-1-0.dll' },
              { title: 'api-ms-win-core-timezone-l1-1-0.dll' },
              { title: 'api-ms-win-core-util-l1-1-0.dll' },
              { title: 'api-ms-win-crt-conio-l1-1-0.dll' },
              { title: 'api-ms-win-crt-convert-l1-1-0.dll' },
              { title: 'api-ms-win-crt-environment-l1-1-0.dll' },
              { title: 'api-ms-win-crt-filesystem-l1-1-0.dll' },
              { title: 'api-ms-win-crt-heap-l1-1-0.dll' },
              { title: 'api-ms-win-crt-locale-l1-1-0.dll' },
              { title: 'api-ms-win-crt-math-l1-1-0.dll' },
              { title: 'api-ms-win-crt-multibyte-l1-1-0.dll' },
              { title: 'api-ms-win-crt-private-l1-1-0.dll' },
              { title: 'api-ms-win-crt-process-l1-1-0.dll' },
              { title: 'api-ms-win-crt-runtime-l1-1-0.dll' },
              { title: 'api-ms-win-crt-stdio-l1-1-0.dll' },
              { title: 'api-ms-win-crt-string-l1-1-0.dll' },
              { title: 'api-ms-win-crt-time-l1-1-0.dll' },
              { title: 'api-ms-win-crt-utility-l1-1-0.dll' },
              { title: 'cef.pak' },
              { title: 'cef_100_percent.pak' },
              { title: 'cef_200_percent.pak' },
              { title: 'cef_extensions.pak' },
              { title: 'chrome_elf.dll' },
              { title: 'crash_reporter.cfg' },
              { title: 'd3dcompiler_47.dll' },
              { title: 'dbgcore.dll' },
              { title: 'debug.log' },
              { title: 'devtools_resources.pak' },
              { title: 'html5app_steam.exe' },
              { title: 'icudtl.dat' },
              { title: 'libcef.dll' },
              { title: 'libEGL.dll' },
              { title: 'libGLESv2.dll' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'C',
    description: 'System Res',
    dir: [
      {
        title: 'Boot',
        dir: [
          {
            title: 'alldb.db',
          },
        ],
      },
      {
        title: 'Recovery',
        dir: [
          {
            title: 'install.wim',
          },
          {
            title: 'Recovery.txt',
          },
          {
            title: 'rrt.txt',
          },
        ],
      },
      {
        title: 'System Volume I..',
        noEnter: true,
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
        dir: [],
        noEnter: true,
      },
      {
        title: `${newBios.board}.ROM - ${newBios.ver}`,
        biosFile: newBios,
      },
    ],
  },
];
