import { BiosOptionsST } from 'src/app/Array/ToolSettings';
import { Options } from 'src/app/interface/ToolSettings';

export var selectLang = [];

export function getLang(): void {}

export const LangMenu: Options[] = [
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
];



export const English = {
  Main: {
    title: 'System Overview',
    lang_title: 'System Language',
    lang_description: 'Choose the default language',
    time_title: 'System Time',
    time_description: 'Change system time',
    date_title: 'System Date',
    date_description: 'Change system date',
    network_boot_title: 'Network Boot',
    network_boot_description: 'Enable/Disable PXE boot on to LAN',
    wake_on_lan_title: 'Wake on LAN',
    wake_on_lan_description: 'Enable/Disable Integrated LAN to wake the system',
  },
};
