import {InputButtonTypeMetadata} from "./InputButtonType";

declare type InputType = "password" | "text";

export declare interface InputAlertData {
  title: string,
  value: string,
  icon: string | undefined
  inputData: string | null,
  buttonType: InputButtonTypeMetadata | null
}



export declare type AppInputCheckFunction = (value: string) => AppInputCheckFunctionReturn;

export declare interface AppInputCheckFunctionReturn{
  submit: boolean;
  message?: string;
}

declare interface InputAppAlertData {
  value: string,
  buttonType: InputButtonTypeMetadata | null,
  inputType?: InputType
}

export declare interface AppMenuInputData{
  inputData: InputAppAlertData,
  submitFunction: AppInputCheckFunction | ((value: string) => void),
  rejectFunction?: () => void,
  checkFunction?: AppInputCheckFunction;
}
