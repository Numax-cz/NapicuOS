import {Type} from "@angular/core";
import {windowButtonsMetadata, windowData} from "./WindowData";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";
import {NapicuOS_available_language} from "../../language/langs";

export declare interface SystemWindowConstructorMetadata {
  component: Type<any>;
  windowTitle?: { [key in NapicuOS_available_language]: string } | string;
  windowData: windowData;
  windowButtons?: windowButtonsMetadata;
  resizeAllowed?: boolean;
}

export declare interface SystemWindowAppInjectData{
  data: any,
  windowValue:  ProcessWindowValueMetadata,
  process: Process,
  args: string[]
}
