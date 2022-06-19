import {Process} from "./Process";
import {System} from "./System";
import {AppCreatMetadata} from "../interface/System";
import {NapicuOS} from "../system.napicuos";

export class SystemApp extends Process {
  constructor(public appData: AppCreatMetadata) {
    super(NapicuOS.creat_installation_cnt(appData));
  }
}
