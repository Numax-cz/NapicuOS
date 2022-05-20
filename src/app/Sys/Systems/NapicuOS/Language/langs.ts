import {lang_Calendar_cs, lang_Calendar_en, lang_Notification_cs, lang_Notification_en} from "./CalendarMenu";
import {lang_Month_cs, lang_Month_en} from "./Months";
import {lang_Days_cs, lang_Days_en} from "./Days";
import {lang_FileManager_cs, lang_FileManager_en} from "./FileManager";
import {
  lang_Creat_new_dir_cs,
  lang_Creat_new_dir_en,
  lang_Creat_new_doc_cs,
  lang_Creat_new_doc_en, lang_Devices_cs, lang_Devices_en,
  lang_Enter_name_cs, lang_Enter_name_en, lang_Places_cs, lang_Places_en
} from "./Other";

export declare type NapicuOS_available_language = "en" | "cs";

export const NapicuOSLanguages = {
  en: {
    Sys: {
      activities: "Activities",
    },
    CalendarMenu: {
      Notification: lang_Notification_en,
      Calendar: lang_Calendar_en
    },
    Months: lang_Month_en,
    Days: lang_Days_en,
    Apps: {
      FileManager: lang_FileManager_en
    },
    other: {
      creat: {
        creat_dir: lang_Creat_new_dir_en,
        creat_doc: lang_Creat_new_doc_en
      },
      enter_name: lang_Enter_name_en,
      places: lang_Places_en,
      devices: lang_Devices_cs,
    }
  },

  cs: {
    Sys: {
      activities: "Aktivity",
    },
    CalendarMenu: {
      Notification: lang_Notification_cs,
      Calendar: lang_Calendar_cs
    },
    Months: lang_Month_cs,
    Days: lang_Days_cs,
    Apps: {
      FileManager: lang_FileManager_cs
    },
    other: {
      creat: {
        creat_dir: lang_Creat_new_dir_cs,
        creat_doc: lang_Creat_new_doc_cs
      },
      enter_name: lang_Enter_name_cs,
      places: lang_Places_cs,
      devices: lang_Devices_cs,
    }
  }
}
