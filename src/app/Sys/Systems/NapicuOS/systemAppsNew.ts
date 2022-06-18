import {SystemAppsFileManager} from "./SystemComponents/Apps/FileManager";

export class NapicuApps{


  public static SystemAppFileManager(): Promise<any> {
    return new Promise((resolve) => {
      new SystemAppsFileManager(resolve).run()?.Window.open();
    });
  }

}
