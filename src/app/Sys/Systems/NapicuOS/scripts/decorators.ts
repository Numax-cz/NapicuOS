import {NapicuOS} from "../system.napicuos";

export function NapicuDock() {
  return function (target: any, key: string | symbol) {
    let p = target[key];
    const getter = () => {
      return p;
    };

    const setter = (next: any) => {
      p = next;
      NapicuOS.update_dock_items();
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
