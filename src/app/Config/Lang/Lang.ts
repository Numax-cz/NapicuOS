import {Options} from 'src/app/interface/ToolSettings';

export const LangMenu: Options[] = [
  {
    title: 'English',
  },
  {
    title: 'Japanes',
  },
  {
    title: 'Slovenia',
  },
  {
    title: 'Deutschland',
  },
];

export const English = {
  title_enabled: 'Enabled',
  title_disabled: 'Disabled',
  TopMenu: {
    main_title: 'Main',
    advanced_title: 'Advanced',
    boot_title: 'Boot',
    tools_title: 'Tools',
    exit_title: 'Exit',
  },
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
  title_enabled: '有効',
  title_disabled: '無効化',
  TopMenu: {
    main_title: 'メイン',
    advanced_title: 'アドバンスド',
    boot_title: 'ブーツ',
    tools_title: 'ツール',
    exit_title: '出口',
  },
  MainInfoTitle: {
    cpu_type: 'プロセッサタイプ',
    cpu_speed: 'プロセッサの速度',
    cache_size: 'キャッシュサイズ',
    memory_size: '総メモリ',
    se_number: 'シリアルナンバー',
  },
  Main: {
    title: 'システム概要',
    lang_title: 'システム言語',
    lang_description: 'デフォルト言語の選択',
    time_title: 'システム時間',
    time_description: 'システム時間の変更',
    date_title: 'システムの日付',
    date_description: 'システムの日付を変更',
    network_boot_title: 'ネットワークブート',
    network_boot_description: 'ネットワーク上でのPXEブートの有効／無効を設定しま',
    wake_on_lan_title: 'ウェイクオンネットワーク',
    wake_on_lan_description: 'システムを起動するための統合ネットワークの有効化／無効化',
  },
  Advanced: {
    virtual_description: 'これはAMDの仮想化機能スイッチです',
  },
  Boot: {
    title: '',
    boot_mode_title: 'ブートモード',
    boot_mode_description: 'システムブートモードの設定',
    fast_boot_title: '高速起動',
    fast_boot_description: '高速起動の有効化／無効化',
    secure_boot_title: 'セキュアブート',
    secure_boot_description: 'セキュアブートの有効化／無効化',
    boot_priority_title: 'ブートの優先順位',
    boot_priority_description: 'ブート優先順位の設定',
  },
  Exit: {
    title: '',
    default_title: '最適化されたデフォルトのロード',
    default_description: 'すべてのセットアップオプションのデフォルト値を復元/ロードします',
    save_title: '変更の保存とリセット',
    save_description: 'Biosを終了して、変更をCMOSに保存します',
    discard_title: '変更を破棄して終了',
    discard_description: '変更を保存せずにBiosを終了',
  },
  Tools: {
    title: '',
    flash_title: 'Ez Flash',
    flash_description: `ユーティリティーを実行して、BIOSの選択と更新を行います。このユーティリティはFat 12/16/32, NTFS, CD-DISCに対応しています」。`,
  },
};

export const Slovenia = {
  title_enabled: 'Omogočeno',
  title_disabled: 'Onemogočeno',
  TopMenu: {
    main_title: 'Glavni',
    advanced_title: 'Napredno',
    boot_title: 'Čevelj',
    tools_title: 'Orodja',
    exit_title: 'izhod',
  },
  MainInfoTitle: {
    cpu_type: 'Vrsta procesorja',
    cpu_speed: 'Hitrost procesorja',
    cache_size: 'Velikost predpomnilnika',
    memory_size: 'Skupni pomnilnik',
    se_number: 'Serijska številka',
  },
  Main: {
    title: 'Pregled sistema',
    lang_title: 'Sistemski jezik',
    lang_description: 'Izberite privzeti jezik',
    time_title: 'Sistemski čas',
    time_description: 'Spremeni sistemski čas',
    date_title: 'Sistemski datum',
    date_description: 'Spremeni sistemski datum',
    network_boot_title: 'Zagon omrežja',
    network_boot_description: 'Omogoči/izključi zagon PXE na LAN',
    wake_on_lan_title: 'Zbujanje na LAN',
    wake_on_lan_description: 'Omogoči/izključi integrirano omrežje LAN za prebujanje sistema',
  },
  Advanced: {
    virtual_description: 'To je stikalo funkcije virtualizacije AMD',
  },
  Boot: {
    title: '',
    boot_mode_title: 'Način zagona',
    boot_mode_description: 'Set System Boot Mode',
    fast_boot_title: 'Hitri zagon',
    fast_boot_description: 'Enable/Disable Fast Boot',
    secure_boot_title: 'Secure Boot',
    secure_boot_description: 'Omogoči/izključi varen zagon',
    boot_priority_title: 'Boot priority order',
    boot_priority_description: 'Set Boot Priority',
  },
  Exit: {
    title: '',
    default_title: 'Optimizirane privzete nastavitve za nalaganje',
    default_description: 'Obnovi/naloži privzete vrednosti za vse nastavitvene možnosti',
    save_title: 'Shranjevanje sprememb in ponastavitev',
    save_description: 'Izklopi Bios in shrani spremembe v CMOS',
    discard_title: 'Zavrnitev sprememb in izhod',
    discard_description: 'Opustite Bios brez shranjevanja sprememb',
  },
  Tools: {
    title: '',
    flash_title: 'Ez Flash',
    flash_description:
      'Zaženite pripomoček za izbiro in posodobitev BIOS-a. Ta pripomoček podpira Fat 12/16/32, NTFS, CD-DISC',
  },
};

export const Deutschland = {
  title_enabled: 'Aktiviert',
  title_disabled: 'Deaktiviert',
  TopMenu: {
    main_title: 'Haupt',
    advanced_title: 'Erweitert',
    boot_title: 'Hochfahren',
    tools_title: 'Werkzeuge',
    exit_title: 'Beenden',
  },
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
    date_title: 'Datum des Systems',
    date_description: 'Systemdatum ändern',
    network_boot_title: 'Netzwerk-Boot',
    network_boot_description: 'PXE-Boot im LAN aktivieren/deaktivieren',
    wake_on_lan_title: 'Aufwachen im LAN',
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
