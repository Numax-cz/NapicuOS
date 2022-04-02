import {lang_Calendar_en, lang_Calendar_cs, lang_Notification_en, lang_Notification_cs} from "./CalendarMenu";
import {lang_Month_cs, lang_Month_en} from "./Months";
import {lang_Days_cs, lang_Days_en} from "./Days";

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
    Days: lang_Days_en
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
    Days: lang_Days_cs
  }
}
