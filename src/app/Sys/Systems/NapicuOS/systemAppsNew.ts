import {SystemAppsFileManager} from "./SystemComponents/Apps/FileManager";
import {SystemAppsTerminal} from "./SystemComponents/Apps/Terminal";
import {SystemAppsNotepad} from "./SystemComponents/Apps/Notepad";

export class NapicuApps{


  public static SystemAppFileManager(): Promise<any> {
    return new Promise((resolve) => {
      new SystemAppsFileManager(resolve).run()?.Window.open();
    });
  }

  public static SystemAppTerminal(): Promise<any> {
    return new Promise(() => {
      new SystemAppsTerminal().run()?.Window.open();
    });
  }

  public static SystemAppNotepad(): Promise<void>{
    return new Promise(() => {
      new SystemAppsNotepad().run()?.Window.open();
    });
  }

}
