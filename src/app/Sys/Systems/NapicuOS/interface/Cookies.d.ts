import {UserConstructorMetadata} from "./User/user";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: UserConstructorMetadata[]
    activeUser: string | null
  }
  hostname: string
}
