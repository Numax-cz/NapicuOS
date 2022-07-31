# NapicuOS - BETA

- NapicuOS je OpenSource webová aplikace, která simuluje reálný operační systém NapicuOS + bios NapicuBIOS
- Na této stránce najdete základní nastavení biosu
- Vytvořeno v [Angular](https://angular.io/)
- Použitý font [Perfect DOS VGA 437](https://www.dafont.com/perfect-dos-vga-437.font)
- Překlad [DeepL](https://www.deepl.com/)

---

## Preview

![NapicuBiosMainScreen](/src/assets/preview/MainBiosScreen.webp)
![NapicuBiosSettingsScreen](/src/assets/preview/MainBios.webp)
![NapicuBiosFlashScreen](/src/assets/preview/BiosUpdate.webp)
![NapicuOSAppFileManagerScreen](/src/assets/preview/fileManager.png)
![NapicuOSAppWindowScreen](/src/assets/preview/systemAppsScreen.webp)
![NapicuOSPaint](/src/assets/preview/paint.webp)
![NapicuOSCalendar](/src/assets/preview/cale.webp)

---

## Instalace

1. Naklonování repozitáře
   ```sh
   git clone https://github.com/Numax-cz/NapicuOS.git
   ```
2. Nainstalování balíčků
   ```sh
   npm install
   ```

## Spuštění

1. Spuštění aplikace na localhostu
   ```sh
   npm run start
   ```
2. Buildnutí aplikace
   ```sh
   npm run build
   ```

## Vytovření nové aplikace pro operační systém

```sh
npm run newapp <nazev_systemu> <nazev_aplikace>
```
