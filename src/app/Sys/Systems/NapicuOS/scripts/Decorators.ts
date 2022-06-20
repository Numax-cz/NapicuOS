import {NapicuOS} from "../system.napicuos";
import {AppCreatMetadata, ProcessCreatMetadata} from "../interface/System";
import {SystemProcess} from "../SystemComponents/ProcessApp";

export function NapicuCookies() {
  return function (target: any, key: string | symbol) {
    let p = target[key];
    const getter = () => {
      return p;
    };

    const setter = (next: any) => {
      p = next;
      NapicuOS.update_config_to_cookies();
      return p;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

export const SYSTEM_INITS_APPS: AppCreatMetadata[] = [];
export const SYSTEM_INITS_PROCESS: ProcessCreatMetadata[] = [];

export function NapicuApp(data: AppCreatMetadata) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    SYSTEM_INITS_APPS.push(data);
    console.log(SYSTEM_INITS_APPS);
    return class extends constructor {
      static appData: AppCreatMetadata = data;
    }
  }
}

export function NapicuProcess(data: ProcessCreatMetadata) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    SYSTEM_INITS_PROCESS.push(data);
    console.log(SYSTEM_INITS_APPS);
    return class extends constructor {
      public static processName: string = data.processTitle;
      public static processTime: number = data.intervalTime;
    }
  }
}

