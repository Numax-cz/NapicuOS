import {InputButtonTypeMetadata} from "./InputButtonType";

export declare interface InputAlertData {
  title: string,
  value: string,
  icon: string | undefined
  inputData: string | null,
  buttonType: InputButtonTypeMetadata | null
}

export declare interface InputAppAlertData {
  value: string,
  buttonType: InputButtonTypeMetadata | null
}
