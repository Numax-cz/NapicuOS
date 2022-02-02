import { LangMenu } from '../Config/Lang/Lang';
import { BiosIf } from '../interface/BiosInfo';
import { ToolSettings } from '../interface/ToolSettings';
import { GetDrives } from '../Scripts/Drives/Drives';
import { DiscardChanges } from '../Scripts/exit/DiscardChanges';
import { LoadDefaults } from '../Scripts/exit/LoadDefaults';
import { SaveChanges } from '../Scripts/exit/SaveChanges';
import { FlashBios } from '../Scripts/Flash/FlashBios';
import { setDate, setTime } from '../Scripts/TimeDate';
import { isDate, isOption, isTime } from '../Scripts/Type';
import { lang } from './BiosMenu';

export interface BiosOptionsST {
  [index: string]: ToolSettings;
}

export var BiosInfo: BiosIf = {
  title: 'NapicuBios',
  version: 'v2.69',
  date: '1985 - 2021',
};

export var BiosSettings: BiosOptionsST = getBiosData();

/**
 * @returns Returns the basic structure of the bios settings
 */
export function getBiosData(): BiosOptionsST {
  return {
    Main: {
      title: lang.Main.title,
      settings: {
        lang: {
          title: lang.Main.lang_title,
          options: LangMenu,
          description: lang.Main.lang_description,
          selected: 0,
        },
        time: {
          title: lang.Main.time_title,
          time: setTime(),
          description: lang.Main.time_description,
          selected: 0,
        },
        date: {
          title: lang.Main.date_title,
          date: setDate(),
          description: lang.Main.date_description,
          selected: 0,
        },
        network_boot: {
          title: lang.Main.network_boot_title,
          options: [
            {
              title: lang.title_enabled,
            },
            {
              title: lang.title_disabled,
            },
          ],
          description: lang.Main.network_boot_description,
          selected: 0,
        },
        wake_on_lan: {
          title: lang.Main.wake_on_lan_title,
          options: [
            {
              title: lang.title_enabled,
            },
            {
              title: lang.title_disabled,
            },
          ],
          optionsFast: null,
          description: lang.Main.wake_on_lan_description,
          selected: 0,
        },
      },
    },
    Advanced: {
      title: '',
      settings: {
        amd_svm: {
          title: 'AMD-SVM',
          options: [
            {
              title: lang.title_enabled,
            },
            {
              title: lang.title_disabled,
            },
          ],
          description: lang.Advanced.virtual_description,
          selected: 0,
        },
        amd_iommu: {
          title: 'AMD-IOMMU',
          options: [
            {
              title: lang.title_enabled,
            },
            {
              title: lang.title_disabled,
            },
          ],
          description: lang.Advanced.virtual_description,
          selected: 0,
        },
      },
    },
    Boot: {
      title: lang.Boot.title,
      settings: {
        boot_mode: {
          title: lang.Boot.boot_mode_title,
          options: [
            {
              title: 'UEFI',
            },
            {
              title: 'Legacy',
            },
          ],
          description: lang.Boot.boot_mode_description,
          selected: 0,
        },
        fast_boot: {
          title: lang.Boot.fast_boot_title,
          options: [
            {
              title: lang.title_enabled,
            },
            {
              title: lang.title_disabled,
            },
          ],
          description: lang.Boot.fast_boot_description,
          selected: 0,
        },
        boot_secure: {
          title: lang.Boot.secure_boot_title,
          options: [
            {
              title: lang.title_enabled,
            },
            {
              title: lang.title_disabled,
            },
          ],
          description: lang.Boot.secure_boot_description,
          selected: 0,
        },
        boot_priority: {
          title: lang.Boot.boot_priority_title,
          options: GetDrives(true, true),
          description: lang.Boot.boot_priority_description,
          selected: 0,
        },
      },
    },
    Exit: {
      title: lang.Exit.title,
      settings: {
        default: {
          title: lang.Exit.default_title,
          optionsFast: () => LoadDefaults(),
          description: lang.Exit.default_description,
          selected: 0,
        },
        save: {
          title: lang.Exit.save_title,
          optionsFast: () => SaveChanges(),
          description: lang.Exit.save_description,
          selected: 0,
        },
        discard: {
          title: lang.Exit.discard_title,
          optionsFast: () => DiscardChanges(),
          description: lang.Exit.discard_description,
          selected: 0,
        },
      },
    },
    Tools: {
      title: lang.Tools.title,
      settings: {
        flash: {
          title: lang.Tools.flash_title,
          optionsFast: () => FlashBios(),
          description: lang.Tools.flash_description,
          selected: 0,
        },
      },
    },
  };
}

/**
 * Sets the desired settings
 */
export function setBiosSettings(): void {
  BiosSettings = getBiosData();
}

/**
 * Overrides the main bios settings with the input parameter
 *
 * @param {BiosOptionsST} value All bios settings
 */
export function setSettingsValue(value: BiosOptionsST): void {
  for (const [key, val] of Object.entries(value)) {
    Object.keys(val.settings).forEach((valueS: string) => {
      if (isOption(val.settings[valueS])) {
        BiosSettings[key].settings[valueS].selected =
          val.settings[valueS].selected;
      } else if (isDate(val.settings[valueS])) {
        BiosSettings[key].settings[valueS].date = val.settings[valueS].date;
      } else if (isTime(val.settings[valueS])) {
        BiosSettings[key].settings[valueS].time = val.settings[valueS].time;
      }
    });
  }
}
