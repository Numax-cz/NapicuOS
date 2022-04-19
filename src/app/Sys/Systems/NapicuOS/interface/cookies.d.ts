import {UserConstructorMetadata} from "./user";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: UserConstructorMetadata[]
    activeUser: string | null
  }
  computerName: string
}
