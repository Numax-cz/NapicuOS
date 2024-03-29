<h1 align="center">
  <br>
  <img src="./src/assets/icons/NapicuBios-512x512.png" alt="NapicuBios image" width="130">
  <br>
    NapicuOS
  <br>
</h1>

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
![NapicuOSAppWindowScreen](/src/assets/preview/window.png)
![NapicuOSPaint](/src/assets/preview/paint.png)
![NapicuOSCalendar](/src/assets/preview/cale.png)

---

## Instalace
### Co potřebuji ? 
- [Git](https://git-scm.com/)
- [Node - LTS](https://nodejs.org/en/)
- [Java JDK 18](https://www.oracle.com/java/technologies/downloads/#jdk18-windows)
- [OpenWeather](https://openweathermap.org/) API klíč 

1. Naklonujte repozitář
   ```sh
   git clone https://github.com/Numax-cz/NapicuOS.git
   ```
2. Nainstalujte balíčky
   ```sh
   npm install
   ```
3. Nakonfigurujte server 
   - V development configu `Server/src/main/resources/application-dev.yml` nastavte API klíč pro [OpenWeather](https://openweathermap.org/) 

4. Spusťte server
   ```sh
   npm run server-dev
   ```

5. Spusťte script pro inicializaci OpenAPI
    ```sh
     npm run build-openapi-dev
    ```
> Veškeré nastavení scriptů najdete v package.json

> Nastavení serveru naleznete ve složce `Server/src/main/resources` více 
> ohledně Spring profilů naleznete na [docs.spring.io](https://docs.spring.io/spring-boot/docs/1.2.3.RELEASE/reference/html/boot-features-external-config.html)

---

## Spuštění
- Spuštění aplikace pro development
   ```sh
   npm run dev
   ```
   >Development spuštění urychlí boot time (nelze se dostat do BIOSU)

- Spuštění aplikace pro nasazení
   ```sh
   npm run start
   ```
   >Normální spuštění aplikace
> - Profily spuštění NapicuBIOS najdete `src/app/bios/config/bootloader.prod.ts` a `src/app/Bios/Config/bootloader.ts`
> - Profily spuštění NapicuOS najdete `src/app/system/Systems/NapicuOS/config/run.prod.ts` a `src/app/system/Systems/NapicuOS/config/run.ts`
> - Více ohledně Angular profilů naleznete na [Configuring application environments](https://angular.io/guide/build)

- Buildnutí aplikace
   ```sh
   npm run build
   ```
   >Aplikace se automaticky builde v configuraci pro nasazení

- Spuštění serveru pro development
   ```sh
   npm run server-dev
   ```
  >Ve výchozím nastavení se aplikace spustí na portu `8080`

## Vytvoření nové aplikace pro operační systém

```sh
npm run newapp <nazev_systemu> <nazev_aplikace>
```
