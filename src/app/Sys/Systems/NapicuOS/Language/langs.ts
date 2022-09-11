import {lang_Calendar_cs, lang_Calendar_en, lang_Notification_cs, lang_Notification_en} from "./CalendarMenu";
import {lang_Months_cs, lang_Months_en} from "./Months";
import {lang_Days_cs, lang_Days_en} from "./Days";
import {lang_FileManager_cs, lang_FileManager_en} from "./FileManager";
import {
  lang_activities_cs,
  lang_activities_en,
  lang_add_user_cs,
  lang_add_user_en,
  lang_auth_and_pass_cs,
  lang_auth_and_pass_en,
  lang_auto_auth_cs,
  lang_auto_auth_en,
  lang_back_cs,
  lang_back_en,
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
  lang_change_password_cs,
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
  lang_do_not_disturb_cs,
  lang_do_not_disturb_en,
  lang_Enabled_cs,
  lang_Enabled_en,
  lang_Enter_name_cs,
  lang_Enter_name_en,
  lang_enter_new_name_cs,
  lang_enter_new_name_en,
  lang_enter_root_pass_cs,
  lang_enter_root_pass_en,
  lang_last_update_minutes_cs,
  lang_last_update_minutes_en,
  lang_next_cs,
  lang_next_en,
  lang_none_cs,
  lang_none_en,
  lang_pass_error_cs,
  lang_pass_error_en,
  lang_password_cs,
  lang_password_en,
  lang_Places_cs,
  lang_Places_en,
  lang_rename_cs,
  lang_rename_en,
  lang_system_lang_cs,
  lang_system_lang_en,
  lang_system_volume_cs,
  lang_system_volume_en,
  lang_time_custom_wallpaper_cs,
  lang_time_custom_wallpaper_en,
  lang_time_format_cs,
  lang_time_format_en,
  lang_users_cs,
  lang_users_en,
  lang_verify_cs,
  lang_verify_en,
  lang_verify_user_2_cs,
  lang_verify_user_2_en,
  lang_verify_user_cs,
  lang_verify_user_en,
  lang_weather_data_from_cs,
  lang_weather_data_from_en,
  lang_yes_cs,
  lang_yes_en,
  lang_your_hostname_cs,
  lang_your_username_cs,
  lang_chose_password_cs,
  lang_chose_password_en,
  lang_your_hostname_en,
  lang_your_username_en,
  lang_confirm_password_en,
  lang_confirm_password_cs,
  lang_creat_new_user_cs,
  lang_creat_new_user_en,
  lang_dark_en,
  lang_white_en,
  lang_dark_cs,
  lang_white_cs,
  lang_theme_en,
  lang_theme_cs,
  lang_system_language_cs,
  lang_system_language_en,
  lang_welcome_main_title_cs,
  lang_welcome_main_desc_cs,
  lang_welcome_main_title_en,
  lang_welcome_main_desc_en,
  lang_welcome_built_on_angular_cs,
  lang_welcome_built_on_angular_en,
  lang_user_en,
  lang_user_cs,
  lang_welcome_text_cs,
  lang_welcome_text_en,
  lang_language_text_cs,
  lang_language_text_en,
  lang_install_text_en,
  lang_install_text_cs,
  lang_welcome_installing_system_en,
  lang_welcome_creating_users_en,
  lang_welcome_verifying_en,
  lang_welcome_done_en,
  lang_welcome_installing_system_cs,
  lang_welcome_creating_users_cs,
  lang_welcome_verifying_cs,
  lang_welcome_done_cs,
  lang_welcome_done_desc_cs, lang_welcome_done_desc_en, lang_finish_text_en, lang_finish_text_cs
} from "./Other";
import {lang_Day_cs, lang_Day_en, lang_Month_cs, lang_Month_en, lang_Year_cs, lang_Year_en} from "./Date";
import {lang_Weather_city_not_found_cs, lang_Weather_city_not_found_en} from "./Weather";
import {
  lang_NapicuApi_server_error_cs,
  lang_NapicuApi_server_error_en, lang_NapicuApi_too_many_req_cs,
  lang_NapicuApi_too_many_req_en
} from "./NapicuApi";
import {lang_Settings_about_cs, lang_Settings_about_en, lang_Settings_cs, lang_Settings_en} from "./SystemApp";

export declare type NapicuOS_available_language = "en" | "cs";

export const NapicuOSLanguages = {
  en: {
    CalendarMenu: {
      notification: lang_Notification_en,
      Calendar: lang_Calendar_en
    },
    Months: lang_Months_en,
    Days: lang_Days_en,
    Date: {
      day: lang_Day_en,
      month: lang_Month_en,
      year: lang_Year_en
    },
    Apps: {
      FileManager: lang_FileManager_en,
      Weather: {
        city_not_found: lang_Weather_city_not_found_en,
        data_from: lang_weather_data_from_en
      },
      Settings: lang_Settings_en,
      SettingsAbout: lang_Settings_about_en
    },
    Api: {
      server_error: lang_NapicuApi_server_error_en,
      too_many_req: lang_NapicuApi_too_many_req_en
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
      system_volume: lang_system_volume_en,
      do_not_disturb: lang_do_not_disturb_en,
      last_update_minutes: lang_last_update_minutes_en,
      activities: lang_activities_en,
      password: lang_password_en,
      auto_auth: lang_auto_auth_en,
      auth_and_login: lang_auth_and_pass_en,
      sys_lang: lang_system_lang_en,
      add_user: lang_add_user_en,
      settings_verify_1: lang_verify_user_en,
      settings_verify_2: lang_verify_user_2_en,
      verify: lang_verify_en,
      enter_root_pass: lang_enter_root_pass_en,
      pass_error: lang_pass_error_en,
      users: lang_users_en,
      user: lang_user_en,
      next: lang_next_en,
      back: lang_back_en,
      chose_pass: lang_chose_password_en,
      your_hostname: lang_your_hostname_en,
      your_username: lang_your_username_en,
      confirm_pass: lang_confirm_password_en,
      creat_new_user: lang_creat_new_user_en,
      dark: lang_dark_en,
      white: lang_white_en,
      theme: lang_theme_en,
      system_language: lang_system_language_en,
      welcome_main_title: lang_welcome_main_title_en,
      welcome_desc_text: lang_welcome_main_desc_en,
      built_on_angular: lang_welcome_built_on_angular_en,
      welcome: lang_welcome_text_en,
      language: lang_language_text_en,
      install: lang_install_text_en,
      finish: lang_finish_text_en,
      welcome_installing_system: lang_welcome_installing_system_en,
      welcome_creating_users: lang_welcome_creating_users_en,
      welcome_verifying: lang_welcome_verifying_en,
      welcome_done: lang_welcome_done_en,
      welcome_done_installation: lang_welcome_done_desc_en
    }
  },

  cs: {
    CalendarMenu: {
      notification: lang_Notification_cs,
      Calendar: lang_Calendar_cs
    },
    Months: lang_Months_cs,
    Days: lang_Days_cs,
    Date: {
      day: lang_Day_cs,
      month: lang_Month_cs,
      year: lang_Year_cs
    },
    Apps: {
      FileManager: lang_FileManager_cs,
      Weather: {
        city_not_found: lang_Weather_city_not_found_cs,
        data_from: lang_weather_data_from_cs
      },
      Settings: lang_Settings_cs,
      SettingsAbout: lang_Settings_about_cs
    },
    Api: {
      server_error: lang_NapicuApi_server_error_cs,
      too_many_req: lang_NapicuApi_too_many_req_cs
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
      change_password: lang_change_password_cs,
      change_username: lang_change_username_cs,
      date_and_time: lang_change_date_and_time_cs,
      automatic_date_and_time: lang_change_date_and_time_automatic_cs,
      time_format: lang_time_format_cs,
      custom_wallpaper: lang_time_custom_wallpaper_cs,
      system_volume: lang_system_volume_cs,
      do_not_disturb: lang_do_not_disturb_cs,
      last_update_minutes: lang_last_update_minutes_cs,
      activities: lang_activities_cs,
      password: lang_password_cs,
      auto_auth: lang_auto_auth_cs,
      auth_and_login: lang_auth_and_pass_cs,
      sys_lang: lang_system_lang_cs,
      add_user: lang_add_user_cs,
      settings_verify_1: lang_verify_user_cs,
      settings_verify_2: lang_verify_user_2_cs,
      verify: lang_verify_cs,
      enter_root_pass: lang_enter_root_pass_cs,
      pass_error: lang_pass_error_cs,
      users: lang_users_cs,
      user: lang_user_cs,
      next: lang_next_cs,
      back: lang_back_cs,
      chose_pass: lang_chose_password_cs,
      your_hostname: lang_your_hostname_cs,
      your_username: lang_your_username_cs,
      confirm_pass: lang_confirm_password_cs,
      creat_new_user: lang_creat_new_user_cs,
      dark: lang_dark_cs,
      white: lang_white_cs,
      theme: lang_theme_cs,
      system_language: lang_system_language_cs,
      welcome_main_title: lang_welcome_main_title_cs,
      welcome_desc_text: lang_welcome_main_desc_cs,
      built_on_angular: lang_welcome_built_on_angular_cs,
      welcome: lang_welcome_text_cs,
      language: lang_language_text_cs,
      install: lang_install_text_cs,
      finish: lang_finish_text_cs,
      welcome_installing_system: lang_welcome_installing_system_cs,
      welcome_creating_users: lang_welcome_creating_users_cs,
      welcome_verifying: lang_welcome_verifying_cs,
      welcome_done: lang_welcome_done_cs,
      welcome_done_installation: lang_welcome_done_desc_cs
    }
  }
}
