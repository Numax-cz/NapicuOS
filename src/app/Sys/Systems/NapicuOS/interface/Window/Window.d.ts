import {Input, Type} from "@angular/core";
import {windowButtonsMetadata, windowData} from "./WindowData";
import {Process, ProcessWindowValueMetadata} from "../../SystemComponents/Process";

export declare interface SystemWindowConstructorMetadata {
  component: Type<any>;
  windowTitle?: string;
  windowData: windowData;
  windowButtons?: windowButtonsMetadata;
  resizeAllowed?: boolean;
}

export declare interface SystemWindowAppInjectData{
  data: any,
  windowValue:  ProcessWindowValueMetadata,
  process: Process,
}
