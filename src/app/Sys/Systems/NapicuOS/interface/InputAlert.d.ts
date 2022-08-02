import {InputButtonTypeMetadata} from "./InputButtonType";

declare type InputType = "password" | "text";

export declare interface InputAlertData {
  title: string,
  value: string,
  icon: string | undefined
  inputData: string | null,
  buttonType: InputButtonTypeMetadata | null
}



export declare type AppInputSubmitFunction = (value: string) => void;
export declare type AppInputCheckFunction = (value: string) => boolean;

declare interface InputAppAlertData {
  value: string,
  buttonType: InputButtonTypeMetadata | null,
  inputType?: InputType
}

export declare interface AppMenuInputData{
  inputData: InputAppAlertData,
  submitFunction: AppInputSubmitFunction,
  rejectFunction?: () => void,
  checkFunction?: AppInputCheckFunction;
}
