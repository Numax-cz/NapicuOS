# NapicuOS - BETA

- NapicuOS je OpenSource webová aplikace, která simuluje reálný operační systém NapicuOS + bios NapicuBIOS
- Na této stránce najdete základní nastavení biosu
- Vytvořeno v [Angular](https://angular.io/)
- Použitý font [Perfect DOS VGA 437](https://www.dafont.com/perfect-dos-vga-437.font)
- Překlad [DeepL](https://www.deepl.com/)
- Inspirováno [Gnome](https://www.gnome.org/)
- Ikony [Flat-Remix](https://github.com/daniruiz/flat-remix)

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

1. Naklonujte repozitář
   ```sh
   git clone https://github.com/Numax-cz/NapicuOS.git
   ```
2. Nainstalujte balíčky
   ```sh
   npm install
   ```

3. Spusťte server
   ```sh
   npm run server-dev
   ```

4. Spusťte script pro inicializaci OpenAPI
    ```sh
     npm run build-openapi-dev
    ```
> Veškeré nastavení scriptů najdete v package.json

> Nastavení serveru naleznete ve složce `Server/src/main/resources` více 
> ohledně Spring profilů naleznete na [docs.spring.io](https://docs.spring.io/spring-boot/docs/1.2.3.RELEASE/reference/html/boot-features-external-config.html)

---

## Spuštění

1. Spuštění aplikace pro development
   ```sh
   npm run dev
   ```
   >Development spuštění urychlí boot time (nelze se dostat do BIOSU)

2. Spuštění aplikace pro nasazení
   ```sh
   npm run start
   ```
   >Normální spuštění aplikace
   
2. Buildnutí aplikace
   ```sh
   npm run build
   ```
   >Aplikace se automaticky builde v configuraci pro nasazení

## Vytovření nové aplikace pro operační systém

```sh
npm run newapp <nazev_systemu> <nazev_aplikace>
```
