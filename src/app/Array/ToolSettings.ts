import { LangMenu } from '../Config/Lang/English';
import { BiosIf } from '../interface/BiosInfo';
import { settings, ToolSettings } from '../interface/ToolSettings';
import { DiscardChanges } from '../Scripts/exit/DiscardChanges';
import { LoadDefaults } from '../Scripts/exit/LoadDefaults';
import { SaveChanges } from '../Scripts/exit/SaveChanges';
import { FlashBios } from '../Scripts/Flash/FlashBios';
import { getLanguage } from '../Scripts/getLanguage';
import { setDate, setTime } from '../Scripts/TimeDate';
import { isDate, isOption, isTime } from '../Scripts/Type';
export interface BiosOptionsST {
  [index: string]: ToolSettings;
}

export var BiosInfo: BiosIf = {
  title: 'NapicuBios',
  version: 'v2.69',
  date: '1985 - 2021',
};
export var lang = getLanguage();
export var BiosSettings: BiosOptionsST = {
  Main: {
    title:  lang.Main.title,
    settings: [
      {
        title: 'System Language',
        options: LangMenu,
        description: 'Choose the default language',
        selected: 0,
      },
      {
        title: 'System Time',
        time: setTime(),
        description: 'Nastavení',
        selected: 0,
      },
      {
        title: 'System Date',
        date: setDate(),
        description: 'Nastavení',
        selected: 0,
      },
      {
        title: 'Network Boot',
        options: [
          {
            title: 'Disabled',
          },
          {
            title: 'Enabled',
          },
        ],
        description: 'Enable/Disable PXE boot on to LAN',
        selected: 0,
      },
      {
        title: 'Wake on LAN',
        options: [
          {
            title: 'Disabled',
          },
          {
            title: 'Enabled',
          },
        ],
        optionsFast: null,
        description: 'Enable/Disable Integrated LAN to wake the system',
        selected: 0,
      },
    ],
  },
  Boot: {
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
        description: 'Set System Boot Mode',
        selected: 0,
      },
      {
        title: 'Fast Boot',
        options: [
          {
            title: 'Enabled',
          },
          {
            title: 'Disabled',
          },
        ],
        description: 'Enable/Disable Fast Boot',
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
        description: 'Nastavení',
        selected: 0,
      },
    ],
  },
  Exit: {
    title: '',
    settings: [
      {
        title: 'Load Optimized Defaults',
        optionsFast: () => LoadDefaults(),
        description: 'Restores/loads the default values for all the setup options',
        selected: 0,
      },
      {
        title: 'Save Changes & Reset',
        optionsFast: () => SaveChanges(),
        description: 'Exit Bios and save your changes to CMOS.',
        selected: 0,
      },
      {
        title: 'Discard Changes & Exit',
        optionsFast: () => DiscardChanges(),
        description: 'Exit Bios without saving any changes.',
        selected: 0,
      },
    ],
  },
  Tools: {
    title: '',
    settings: [
      {
        title: 'Ez Flash',
        optionsFast: () => FlashBios(),
        description: `
          Run the utility to select and update BIOS. This utility supports 
          Fat 12/16/32, NTFS, CD-DISC, 
          `,
        selected: 0,
      },
    ],
  },
};

/**
 * Overrides the main bios settings with the input parameter
 *
 * @param {BiosOptionsST} value All bios settings
 */
export function setSettingsValue(value: BiosOptionsST): void {
  for (const [key, val] of Object.entries(value)) {
    val.settings.forEach((St: settings, indexVal: number) => {
      if (isOption(St)) {
        BiosSettings[key].settings[indexVal].selected = St.selected;
      } else if (isDate(St)) {
        BiosSettings[key].settings[indexVal].date = St.date;
      } else if (isTime(St)) {
        BiosSettings[key].settings[indexVal].time = St.time;
      }
    });
  }
}
