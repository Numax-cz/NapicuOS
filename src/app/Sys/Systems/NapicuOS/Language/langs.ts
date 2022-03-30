import {lang_Calendar_en, lang_Calendar_cs, lang_Notification_en, lang_Notification_cs} from "./CalendarMenu";

export declare type NapicuOS_available_language = "en" | "cs";

export const NapicuOSLanguages = {
  en: {
    Sys: {
      activities: "Activities",
    },
    CalendarMenu: {
      Notification: lang_Notification_en,
      Calendar: lang_Calendar_en
    }
  },

  cs: {
    Sys: {
      activities: "Aktivity",
    },
    CalendarMenu: {
      Notification: lang_Notification_cs,
      Calendar: lang_Calendar_cs
    }
  }
}
