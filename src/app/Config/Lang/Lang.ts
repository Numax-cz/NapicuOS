import { Options } from 'src/app/interface/ToolSettings';

export const LangMenu: Options[] = [
  {
    title: 'English',
  },
  {
    title: 'Japanes',
  },
  {
    title: 'Slovakia',
  },
  {
    title: 'Deutschland',
  },
];

export const English = {
  title_enabled: 'Enabled',
  title_disabled: 'Disabled',
  MainInfoTitle: {
    cpu_type: 'Processor Type',
    cpu_speed: 'Processor Speed',
    cache_size: 'Cache Size',
    memory_size: 'Total Memory',
    se_number: 'Serial Number',
  },
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
  Advanced: {
    virtual_description: 'This is AMD virtualization function switch',
  },
  Boot: {
    title: '',
    boot_mode_title: 'Boot Mode',
    boot_mode_description: 'Set System Boot Mode',
    fast_boot_title: 'Fast Boot',
    fast_boot_description: 'Enable/Disable Fast Boot',
    secure_boot_title: 'Secure Boot',
    secure_boot_description: 'Enable/Disable Secure Boot',
    boot_priority_title: 'Boot priority order',
    boot_priority_description: 'Set Boot Priority',
  },
  Exit: {
    title: '',
    default_title: 'Load Optimized Defaults',
    default_description: 'Restores/loads the default values for all the setup options',
    save_title: 'Save Changes & Reset',
    save_description: 'Exit Bios and save your changes to CMOS',
    discard_title: 'Discard Changes & Exit',
    discard_description: 'Exit Bios without saving any changes',
  },
  Tools: {
    title: '',
    flash_title: 'Ez Flash',
    flash_description:
      'Run the utility to select and update BIOS. This utility supports Fat 12/16/32, NTFS, CD-DISC',
  },
};

export const Japanes = {
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
  Boot: {
    title: '',
    boot_mode_title: 'Boot Mode',
    boot_mode_description: 'Set System Boot Mode',
    fast_boot_title: 'Fast Boot',
    fast_boot_description: 'Enable/Disable Fast Boot',
    secure_boot_title: 'Secure Boot',
    secure_boot_description: 'Enable/Disable Secure Boot',
    boot_priority_title: 'Boot priority order',
    boot_priority_description: 'Set Boot Priority',
  },
  Exit: {
    title: '',
    default_title: 'Load Optimized Defaults',
    default_description: 'Restores/loads the default values for all the setup options',
    save_title: 'Save Changes & Reset',
    save_description: 'Exit Bios and save your changes to CMOS',
    discard_title: 'Discard Changes & Exit',
    discard_description: 'Exit Bios without saving any changes',
  },
  Tools: {
    title: '',
    flash_title: 'Ez Flash',
    flash_description:
      'Run the utility to select and update BIOS. This utility supports Fat 12/16/32, NTFS, CD-DISC',
  },
};

export const Slovakia = {
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
  Boot: {
    title: '',
    boot_mode_title: 'Boot Mode',
    boot_mode_description: 'Set System Boot Mode',
    fast_boot_title: 'Fast Boot',
    fast_boot_description: 'Enable/Disable Fast Boot',
    secure_boot_title: 'Secure Boot',
    secure_boot_description: 'Enable/Disable Secure Boot',
    boot_priority_title: 'Boot priority order',
    boot_priority_description: 'Set Boot Priority',
  },
  Exit: {
    title: '',
    default_title: 'Load Optimized Defaults',
    default_description: 'Restores/loads the default values for all the setup options',
    save_title: 'Save Changes & Reset',
    save_description: 'Exit Bios and save your changes to CMOS',
    discard_title: 'Discard Changes & Exit',
    discard_description: 'Exit Bios without saving any changes',
  },
  Tools: {
    title: '',
    flash_title: 'Ez Flash',
    flash_description:
      'Run the utility to select and update BIOS. This utility supports Fat 12/16/32, NTFS, CD-DISC',
  },
};

export const Deutschland = {
  title_enabled: 'Aktiviert',
  title_disabled: 'Deaktiviert',
  MainInfoTitle: {
    cpu_type: 'Prozessor-Typ',
    cpu_speed: 'Geschwindigkeit des Prozessors',
    cache_size: 'Cache-Große',
    memory_size: 'Gesamtspeicher',
    se_number: 'Seriennummer',
  },
  Main: {
    title: 'Systemübersicht',
    lang_title: 'Systemsprache',
    lang_description: 'Wählen Sie die Standardsprache',
    time_title: 'Systemzeit',
    time_description: 'Systemzeit ändern',
    date_title: 'System Datum',
    date_description: 'Systemdatum ändern',
    network_boot_title: 'Netzwerk-Boot',
    network_boot_description: 'PXE-Boot im LAN aktivieren/deaktivieren',
    wake_on_lan_title: 'Wake on LAN',
    wake_on_lan_description: 'Aktivieren/Deaktivieren des integrierten LAN zum Aufwecken des Systems',
  },
  Boot: {
    title: '',
    boot_mode_title: 'Boot-Modus',
    boot_mode_description: 'System-Boot-Modus einstellen',
    fast_boot_title: 'Schneller Start',
    fast_boot_description: 'Fast Boot aktivieren/deaktivieren',
    secure_boot_title: 'Sicherer Boot',
    secure_boot_description: 'Secure Boot aktivieren/deaktivieren',
    boot_priority_title: 'Boot-Prioritätsreihenfolge',
    boot_priority_description: 'Bootpriorität festlegen',
  },
  Exit: {
    title: '',
    default_title: 'Optimierte Standardeinstellungen laden',
    default_description: 'Stellt die Standardwerte für alle Einrichtungsoptionen wieder her/lädt sie',
    save_title: 'Änderungen speichern & zurücksetzen',
    save_description: 'Beende Bios und speichere deine Änderungen im CMOS',
    discard_title: 'Änderungen verwerfen & Beenden',
    discard_description: 'Bios beenden, ohne Änderungen zu speichern',
  },
  Advanced: {
    virtual_description: 'Dies ist der Schalter für die AMD-Virtualisierungsfunktion',
  },
  Tools: {
    title: '',
    flash_title: 'Ez Flash',
    flash_description:
      'Führen Sie das Dienstprogramm aus, um das BIOS auszuwählen und zu aktualisieren. Dieses Dienstprogramm unterstützt Fat 12/16/32, NTFS, CD-DISC',
  },
};
