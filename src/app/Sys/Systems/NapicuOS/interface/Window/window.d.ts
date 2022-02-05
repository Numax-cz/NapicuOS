import {Type} from "@angular/core";
import {windowButtonsMetadata, windowData} from "./windowData";

export declare interface SystemWindowConstructorMetadata {
  component: Type<any>;
  windowTitle?: string;
  windowData?: windowData;
  windowButtons?: windowButtonsMetadata;
  resizeAllowed?: boolean;
}
