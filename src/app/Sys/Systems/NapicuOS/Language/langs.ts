import {lang_Calendar_cs, lang_Calendar_en, lang_Notification_cs, lang_Notification_en} from "./CalendarMenu";
import {lang_Month_cs, lang_Month_en} from "./Months";
import {lang_Days_cs, lang_Days_en} from "./Days";
import {lang_FileManager_cs, lang_FileManager_en} from "./FileManager";
import {
  lang_Cancel_any_cs,
  lang_Cancel_any_en,
  lang_change_cs,
  lang_change_date_and_time_automatic_cs,
  lang_change_date_and_time_automatic_en,
  lang_change_date_and_time_cs,
  lang_change_date_and_time_en,
  lang_change_en,
  lang_change_hostname_cs,
  lang_change_hostname_en,
  lang_change_password_en,
  lang_change_pasword_cs,
  lang_change_username_cs,
  lang_change_username_en,
  lang_Creat_any_cs,
  lang_Creat_any_en,
  lang_Creat_new_dir_cs,
  lang_Creat_new_dir_en,
  lang_Creat_new_doc_cs,
  lang_Creat_new_doc_en,
  lang_Devices_cs,
  lang_Devices_en,
  lang_Disabled_cs,
  lang_Disabled_en,
  lang_Enabled_cs,
  lang_Enabled_en,
  lang_Enter_name_cs,
  lang_Enter_name_en,
  lang_enter_new_name_cs,
  lang_enter_new_name_en,
  lang_none_cs,
  lang_none_en,
  lang_Places_cs,
  lang_Places_en,
  lang_rename_cs,
  lang_rename_en, lang_system_volume_cs, lang_system_volume_en,
  lang_time_custom_wallpaper_cs,
  lang_time_custom_wallpaper_en,
  lang_time_format_cs,
  lang_time_format_en,
  lang_yes_cs,
  lang_yes_en
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
        creat_doc: lang_Creat_new_doc_en,
        creat_any: lang_Creat_any_en
      },
      cancel_any: lang_Cancel_any_en,
      enter_name: lang_Enter_name_en,
      places: lang_Places_en,
      devices: lang_Devices_en,
      enter_new_name: lang_enter_new_name_en,
      rename: lang_rename_en,
      disabled: lang_Disabled_en,
      enabled: lang_Enabled_en,
      yes: lang_yes_en,
      none: lang_none_en,
      change: lang_change_en,
      change_host_name: lang_change_hostname_en,
      change_password: lang_change_password_en,
      change_username: lang_change_username_en,
      date_and_time: lang_change_date_and_time_en,
      automatic_date_and_time: lang_change_date_and_time_automatic_en,
      time_format: lang_time_format_en,
      custom_wallpaper: lang_time_custom_wallpaper_en,
      system_volume: lang_system_volume_en
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
        creat_doc: lang_Creat_new_doc_cs,
        creat_any: lang_Creat_any_cs
      },
      cancel_any: lang_Cancel_any_cs,
      enter_name: lang_Enter_name_cs,
      places: lang_Places_cs,
      devices: lang_Devices_cs,
      enter_new_name: lang_enter_new_name_cs,
      rename: lang_rename_cs,
      disabled: lang_Disabled_cs,
      enabled: lang_Enabled_cs,
      yes: lang_yes_cs,
      none: lang_none_cs,
      change: lang_change_cs,
      change_host_name: lang_change_hostname_cs,
      change_password: lang_change_pasword_cs,
      change_username: lang_change_username_cs,
      date_and_time: lang_change_date_and_time_cs,
      automatic_date_and_time: lang_change_date_and_time_automatic_cs,
      time_format: lang_time_format_cs,
      custom_wallpaper: lang_time_custom_wallpaper_cs,
      system_volume: lang_system_volume_cs
    }
  }
}
