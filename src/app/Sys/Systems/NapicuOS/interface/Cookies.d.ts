import {UserConstructorMetadata} from "./User/User";

export declare interface NapicuOsCookiesTemplate {
  user: {
    users: UserConstructorMetadata[]
    activeUser: string | null
  }
  hostname: string
  directorys: string[]
}
